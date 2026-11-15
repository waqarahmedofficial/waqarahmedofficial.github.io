/**
 * ============================================================================
 *  INVOICE REMINDER SYSTEM  —  Sample 2
 *  Business Workflow Automation (Google Sheets + Apps Script)
 * ============================================================================
 *
 *  WHAT IT DOES
 *  ------------
 *  Checks an "Invoices" sheet once a day (time-driven trigger). Any unpaid
 *  invoice past its due date gets a polite-but-escalating reminder email:
 *
 *    Stage 1 —  1 day overdue  : friendly nudge
 *    Stage 2 —  7 days overdue : firm follow-up
 *    Stage 3 — 14 days overdue : final notice
 *
 *  Each stage is sent AT MOST ONCE per invoice: the date it went out is
 *  written back into the invoice row ("sent flags"), so the system can
 *  never double-send a stage — even if it runs twice in one day.
 *  Every reminder (sent or log-only) is written to a "Reminder Log" sheet.
 *
 *  SHEET LAYOUT (created for you by setup())
 *  -----------------------------------------
 *  Invoices columns:
 *    A Invoice ID | B Client Name | C Client Email | D Amount | E Currency |
 *    F Issue Date | G Due Date | H Status | I Stage 1 Sent |
 *    J Stage 2 Sent | K Stage 3 Sent | L Notes
 *  Status values used by the system: Unpaid, Paid, Cancelled.
 *  (The system also flips Unpaid → Overdue for display once past due;
 *   Paid and Cancelled invoices are always skipped.)
 *
 *  SAFETY SWITCH
 *  -------------
 *  CONFIG.LOG_ONLY starts as true: the system writes what it WOULD send
 *  into the Reminder Log and sends nothing. Review the log with your real
 *  data, then set LOG_ONLY to false to start sending real reminders.
 *
 *  HOW TO INSTALL (5 minutes — full walkthrough in README.md)
 *  ----------------------------------------------------------
 *  1. Make a copy of the sample spreadsheet.
 *  2. Extensions → Apps Script, paste this file, edit the CONFIG block.
 *  3. Run setup() once and approve permissions.
 *  4. Run createDailyTrigger() once. Done — it checks every morning.
 *
 *  Author: Waqar Ahmed — spreadsheet & automation specialist.
 *  This is a working sample. Client builds are customised to the buyer's
 *  own invoice layout, wording and payment terms before delivery.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
//  CONFIG — the only block a client ever needs to edit.
// ---------------------------------------------------------------------------
const CONFIG = {
  INVOICES_SHEET: 'Invoices',
  LOG_SHEET: 'Reminder Log',

  // SAFETY: true = write reminders to the Log only, send nothing.
  // Switch to false when you are ready for real emails to go out.
  LOG_ONLY: true,

  // Your business name and the address payment questions should go to.
  BUSINESS_NAME: 'Your Business',
  REPLY_TO: 'accounts@example.com',

  // Reminder schedule: days past the due date for each stage.
  STAGE_DAYS: { 1: 1, 2: 7, 3: 14 }
};

// Column positions in the Invoices sheet (1 = column A).
const COL = {
  ID: 1, CLIENT: 2, EMAIL: 3, AMOUNT: 4, CURRENCY: 5, ISSUE_DATE: 6,
  DUE_DATE: 7, STATUS: 8, STAGE1: 9, STAGE2: 10, STAGE3: 11, NOTES: 12
};
const HEADER_ROW = 1;
const FIRST_DATA_ROW = 2;

// ---------------------------------------------------------------------------
//  SETUP — run once. Creates the sheets, headers and the menu.
// ---------------------------------------------------------------------------
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let inv = ss.getSheetByName(CONFIG.INVOICES_SHEET);
  if (!inv) inv = ss.insertSheet(CONFIG.INVOICES_SHEET);
  const headers = ['Invoice ID', 'Client Name', 'Client Email', 'Amount',
                   'Currency', 'Issue Date', 'Due Date', 'Status',
                   'Stage 1 Sent', 'Stage 2 Sent', 'Stage 3 Sent', 'Notes'];
  inv.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);
  inv.getRange(HEADER_ROW, 1, 1, headers.length)
     .setFontWeight('bold').setBackground('#0F2A43').setFontColor('#FFFFFF');
  inv.setFrozenRows(1);

  let log = ss.getSheetByName(CONFIG.LOG_SHEET);
  if (!log) log = ss.insertSheet(CONFIG.LOG_SHEET);
  const logHeaders = ['Date', 'Invoice ID', 'Client', 'Stage',
                      'Mode', 'Subject', 'Result'];
  log.getRange(1, 1, 1, logHeaders.length).setValues([logHeaders]);
  log.getRange(1, 1, 1, logHeaders.length)
     .setFontWeight('bold').setBackground('#C9A227');
  log.setFrozenRows(1);

  SpreadsheetApp.getUi().alert(
    'Setup complete. The system is in LOG-ONLY mode (nothing will be sent) ' +
    'until you set CONFIG.LOG_ONLY to false. Now run createDailyTrigger().');
}

/** Creates the daily time-driven trigger (runs every morning, 7–8am). */
function createDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'checkOverdueInvoices') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('checkOverdueInvoices')
           .timeBased().everyDays(1).atHour(7).create();
}

// Friendly menu when the spreadsheet is opened.
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Invoice Reminders')
    .addItem('Check overdue invoices now', 'checkOverdueInvoices')
    .addToUi();
}

// ---------------------------------------------------------------------------
//  CORE — the daily check.
// ---------------------------------------------------------------------------
function checkOverdueInvoices() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.INVOICES_SHEET);
  const lastRow = sheet.getLastRow();
  if (lastRow < FIRST_DATA_ROW) return;

  const today = startOfDay_(new Date());
  const range = sheet.getRange(FIRST_DATA_ROW, 1, lastRow - FIRST_DATA_ROW + 1, COL.NOTES);
  const rows = range.getValues();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const sheetRow = FIRST_DATA_ROW + i;
    const status = String(row[COL.STATUS - 1] || '').trim();

    // Skip anything that is not an open, unpaid invoice.
    if (status === 'Paid' || status === 'Cancelled' || status === '') continue;
    if (!row[COL.ID - 1] || !row[COL.DUE_DATE - 1]) continue;

    const due = startOfDay_(new Date(row[COL.DUE_DATE - 1]));
    const daysOverdue = daysBetween_(due, today);
    if (daysOverdue < CONFIG.STAGE_DAYS[1]) continue;  // not overdue yet

    // Mark the invoice Overdue for display (Paid/Cancelled already skipped).
    if (status === 'Unpaid') sheet.getRange(sheetRow, COL.STATUS).setValue('Overdue');

    // Which stage matches today's age of the debt?
    const stage = daysOverdue >= CONFIG.STAGE_DAYS[3] ? 3
                : daysOverdue >= CONFIG.STAGE_DAYS[2] ? 2 : 1;

    // NO DOUBLE-SEND: if this stage's sent-flag already has a date, stop.
    const flagCol = stage === 1 ? COL.STAGE1 : stage === 2 ? COL.STAGE2 : COL.STAGE3;
    if (row[flagCol - 1]) continue;

    const invoice = {
      id: String(row[COL.ID - 1]),
      client: String(row[COL.CLIENT - 1] || ''),
      email: String(row[COL.EMAIL - 1] || '').trim(),
      amount: row[COL.AMOUNT - 1],
      currency: String(row[COL.CURRENCY - 1] || ''),
      dueDate: due
    };

    const result = sendReminder_(invoice, stage, daysOverdue);

    // Stamp the sent-flag only when actually sent (or log-mode "sent"),
    // so a failed send is retried tomorrow instead of being lost.
    if (result.ok) {
      sheet.getRange(sheetRow, flagCol)
           .setValue(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'));
    }
    logReminder_(invoice, stage, result);
  }
}

/**
 * Builds and (unless LOG_ONLY) sends one staged reminder.
 * Returns { ok: boolean, mode: string, subject: string, result: string }.
 */
function sendReminder_(invoice, stage, daysOverdue) {
  const amountText = invoice.currency + ' ' + Number(invoice.amount).toFixed(2);
  const dueText = Utilities.formatDate(invoice.dueDate, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const subject = reminderSubject_(invoice, stage);
  const body = reminderBody_(invoice, stage, amountText, dueText, daysOverdue);

  if (CONFIG.LOG_ONLY) {
    return { ok: true, mode: 'LOG ONLY', subject: subject,
             result: 'Would send to ' + invoice.email };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoice.email)) {
    return { ok: false, mode: 'SEND', subject: subject,
             result: 'SKIPPED — client email missing or invalid' };
  }
  try {
    MailApp.sendEmail({
      to: invoice.email,
      replyTo: CONFIG.REPLY_TO,
      subject: subject,
      body: body
    });
    return { ok: true, mode: 'SEND', subject: subject, result: 'Sent to ' + invoice.email };
  } catch (err) {
    return { ok: false, mode: 'SEND', subject: subject, result: 'ERROR: ' + err.message };
  }
}

function reminderSubject_(invoice, stage) {
  const base = 'Invoice ' + invoice.id + ' — ';
  if (stage === 1) return base + 'a friendly payment reminder';
  if (stage === 2) return base + 'payment now overdue, please arrange';
  return base + 'final reminder before escalation';
}

function reminderBody_(invoice, stage, amountText, dueText, daysOverdue) {
  const greeting = 'Hello ' + (invoice.client || 'there') + ',';
  const facts = 'Invoice:  ' + invoice.id + '\n' +
                'Amount:   ' + amountText + '\n' +
                'Due date: ' + dueText + ' (' + daysOverdue + ' day' +
                (daysOverdue === 1 ? '' : 's') + ' overdue)';
  let middle;
  if (stage === 1) {
    middle = 'This is a friendly reminder that the invoice below is now past ' +
             'its due date. If payment is already on its way, please ignore ' +
             'this message — and thank you. If anything looks wrong on the ' +
             'invoice, just reply to this email and we will sort it out.';
  } else if (stage === 2) {
    middle = 'We are following up on the invoice below, which is now a week ' +
             'past due. We have not received payment or a reply to our first ' +
             'reminder. Please arrange payment this week, or reply and tell ' +
             'us when to expect it so we can plan accordingly.';
  } else {
    middle = 'This is a final reminder about the invoice below, now two weeks ' +
             'past due. Please arrange payment immediately, or contact us ' +
             'today to agree a plan. If we do not hear from you, we may pause ' +
             'ongoing work and pass the balance to a collections process.';
  }
  return [greeting, '', middle, '', facts, '',
          'Thank you,', CONFIG.BUSINESS_NAME].join('\n');
}

/** Appends one line to the Reminder Log sheet. */
function logReminder_(invoice, stage, result) {
  const log = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.LOG_SHEET);
  log.appendRow([
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'),
    invoice.id, invoice.client, 'Stage ' + stage,
    result.mode, result.subject, result.result
  ]);
}

// ---------------------------------------------------------------------------
//  DATE HELPERS — all date maths is done on whole days (midnight-normalised)
//  so time-of-day and daylight-saving shifts can never skew the stage logic.
// ---------------------------------------------------------------------------
function startOfDay_(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function daysBetween_(from, to) {
  return Math.round((startOfDay_(to) - startOfDay_(from)) / 86400000);
}
