/**
 * ============================================================================
 *  LEAD INTAKE & ALERT SYSTEM  —  Sample 1
 *  Business Workflow Automation (Google Sheets + Apps Script)
 * ============================================================================
 *
 *  WHAT IT DOES
 *  ------------
 *  Watches a "Leads" sheet (fed by a Google Form, or rows typed/pasted in).
 *  Every new lead is automatically:
 *    1. Validated   — required fields checked (name + a valid-looking email).
 *    2. Assigned    — an owner is picked round-robin from your team list.
 *    3. Stamped     — status set to the first pipeline stage ("New").
 *    4. Announced   — an instant email alert (MailApp) goes to the owner
 *                     with a clean summary of the lead.
 *  A "Dashboard" sheet shows live counts of leads by status.
 *
 *  SHEET LAYOUT (created for you by setup())
 *  -----------------------------------------
 *  Leads sheet columns:
 *    A Timestamp | B Name | C Email | D Phone | E Company | F Source |
 *    G Message / Need | H Owner | I Status | J Alert Sent
 *
 *  HOW TO INSTALL (5 minutes — full walkthrough in README.md)
 *  ----------------------------------------------------------
 *  1. Make a copy of the sample spreadsheet.
 *  2. Extensions → Apps Script, delete any starter code, paste this file.
 *  3. Edit the CONFIG block below (team emails, statuses, alert address).
 *  4. Run setup() once and approve the permissions Google asks for.
 *  5. Run createTriggers() once. Done — new leads process themselves.
 *
 *  Author: Waqar Ahmed — spreadsheet & automation specialist.
 *  This is a working sample. Client builds are customised to the buyer's
 *  own form fields, team and pipeline before delivery.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
//  CONFIG — the only block a client ever needs to edit.
// ---------------------------------------------------------------------------
const CONFIG = {
  // Sheet names (must match the tabs in the spreadsheet).
  LEADS_SHEET: 'Leads',
  DASHBOARD_SHEET: 'Dashboard',

  // Team members who receive leads, in round-robin order.
  // Replace these demo addresses with real team Gmail addresses.
  OWNERS: [
    'sales.person1@example.com',
    'sales.person2@example.com',
    'sales.person3@example.com'
  ],

  // Optional extra address copied on every alert (e.g. a manager). '' = off.
  ALERT_CC: '',

  // Pipeline stages. The first one is stamped on every new lead.
  STATUSES: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],

  // Business name used in alert email subjects.
  BUSINESS_NAME: 'Your Business'
};

// Column positions in the Leads sheet (1 = column A). Kept as constants so
// the layout can change in one place without hunting through the code.
const COL = {
  TIMESTAMP: 1, NAME: 2, EMAIL: 3, PHONE: 4, COMPANY: 5, SOURCE: 6,
  MESSAGE: 7, OWNER: 8, STATUS: 9, ALERT_SENT: 10
};
const HEADER_ROW = 1;
const FIRST_DATA_ROW = 2;

// ---------------------------------------------------------------------------
//  SETUP — run once. Creates sheets/headers/dashboard and the menu.
// ---------------------------------------------------------------------------
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // --- Leads sheet + headers ---
  let leads = ss.getSheetByName(CONFIG.LEADS_SHEET);
  if (!leads) leads = ss.insertSheet(CONFIG.LEADS_SHEET);
  const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Source',
                   'Message / Need', 'Owner', 'Status', 'Alert Sent'];
  leads.getRange(HEADER_ROW, 1, 1, headers.length).setValues([headers]);
  leads.getRange(HEADER_ROW, 1, 1, headers.length)
       .setFontWeight('bold').setBackground('#0F2A43').setFontColor('#FFFFFF');
  leads.setFrozenRows(1);

  // --- Dashboard sheet (labels now; values written by refreshDashboard) ---
  let dash = ss.getSheetByName(CONFIG.DASHBOARD_SHEET);
  if (!dash) dash = ss.insertSheet(CONFIG.DASHBOARD_SHEET);
  dash.getRange('A1').setValue('LEAD PIPELINE DASHBOARD').setFontWeight('bold').setFontSize(13);
  dash.getRange('A2').setValue('Status');
  dash.getRange('B2').setValue('Leads');
  dash.getRange('A2:B2').setFontWeight('bold').setBackground('#C9A227');
  CONFIG.STATUSES.forEach(function (status, i) {
    dash.getRange(3 + i, 1).setValue(status);
  });
  dash.getRange(3 + CONFIG.STATUSES.length, 1).setValue('TOTAL').setFontWeight('bold');
  dash.getRange(5 + CONFIG.STATUSES.length, 1)
      .setValue('Last updated:').setFontWeight('bold');
  refreshDashboard();

  SpreadsheetApp.getUi().alert('Setup complete. Now run createTriggers() once.');
}

/**
 * Creates the two installable triggers this system needs:
 *  - a form-submit trigger (fires when a Google Form response lands), and
 *  - an on-edit trigger is NOT used; manual rows are handled by catchUpLeads()
 *    which runs on a 5-minute timer and processes any unprocessed row.
 * Run this once from the Apps Script editor.
 */
function createTriggers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Remove duplicates of our own triggers so re-running is safe.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'handleFormSubmit' ||
        t.getHandlerFunction() === 'catchUpLeads') {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger('handleFormSubmit').forSpreadsheet(ss).onFormSubmit().create();
  ScriptApp.newTrigger('catchUpLeads').timeBased().everyMinutes(5).create();
}

// Adds a friendly menu when the spreadsheet is opened.
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Lead System')
    .addItem('Process any unprocessed leads now', 'catchUpLeads')
    .addItem('Refresh dashboard', 'refreshDashboard')
    .addToUi();
}

// ---------------------------------------------------------------------------
//  ENTRY POINTS
// ---------------------------------------------------------------------------

/**
 * Fires automatically when a Google Form response is submitted.
 * e.range is the response row in the linked sheet.
 */
function handleFormSubmit(e) {
  if (!e || !e.range) return;
  processLeadRow(e.range.getRow());
}

/**
 * Safety net for rows added by hand, imports or other tools: scans the
 * Leads sheet for rows that have data but no Status yet (i.e. not yet
 * processed) and processes them. Runs every 5 minutes via trigger.
 */
function catchUpLeads() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.LEADS_SHEET);
  const lastRow = sheet.getLastRow();
  if (lastRow < FIRST_DATA_ROW) return;
  const statuses = sheet.getRange(FIRST_DATA_ROW, COL.STATUS,
                                  lastRow - FIRST_DATA_ROW + 1, 1).getValues();
  for (let i = 0; i < statuses.length; i++) {
    const row = FIRST_DATA_ROW + i;
    if (!statuses[i][0]) processLeadRow(row);  // empty Status = not processed
  }
}

// ---------------------------------------------------------------------------
//  CORE — validate, assign, stamp, alert: one lead row end to end.
// ---------------------------------------------------------------------------
function processLeadRow(row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.LEADS_SHEET);
  if (row < FIRST_DATA_ROW) return;

  const values = sheet.getRange(row, 1, 1, COL.ALERT_SENT).getValues()[0];
  const lead = {
    timestamp: values[COL.TIMESTAMP - 1] || new Date(),
    name:      String(values[COL.NAME - 1] || '').trim(),
    email:     String(values[COL.EMAIL - 1] || '').trim(),
    phone:     String(values[COL.PHONE - 1] || '').trim(),
    company:   String(values[COL.COMPANY - 1] || '').trim(),
    source:    String(values[COL.SOURCE - 1] || '').trim(),
    message:   String(values[COL.MESSAGE - 1] || '').trim()
  };
  if (!lead.name && !lead.email) return;  // blank row — nothing to do.

  // 1) VALIDATE — name is required; email must be present and well-formed.
  const errors = validateLead_(lead);
  if (errors.length) {
    // Stamp the problem in the Status cell so a human can fix it, and stop.
    sheet.getRange(row, COL.STATUS).setValue('CHECK: ' + errors.join('; '));
    return;
  }

  // 2) ASSIGN — next owner in round-robin order.
  const owner = getNextOwner_();

  // 3) STAMP — owner + first pipeline status.
  sheet.getRange(row, COL.OWNER).setValue(owner);
  sheet.getRange(row, COL.STATUS).setValue(CONFIG.STATUSES[0]);

  // 4) ALERT — instant email to the owner with a clean lead summary.
  sendLeadAlert_(lead, owner);
  sheet.getRange(row, COL.ALERT_SENT)
       .setValue(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'));

  refreshDashboard();
}

/**
 * Validation rules for one lead. Returns an array of problem descriptions;
 * an empty array means the lead is good.
 */
function validateLead_(lead) {
  const errors = [];
  if (!lead.name) errors.push('name is missing');
  if (!lead.email) {
    errors.push('email is missing');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.push('email looks invalid');
  }
  return errors;
}

/**
 * Round-robin owner picker. The rotation position is stored in Script
 * Properties so it survives between runs and is shared by all triggers.
 */
function getNextOwner_() {
  const props = PropertiesService.getScriptProperties();
  const last = parseInt(props.getProperty('rr_last_index') || '-1', 10);
  const next = (last + 1) % CONFIG.OWNERS.length;
  props.setProperty('rr_last_index', String(next));
  return CONFIG.OWNERS[next];
}

/** Sends the alert email for one assigned lead. */
function sendLeadAlert_(lead, owner) {
  const subject = 'New lead assigned to you: ' + lead.name +
                  (lead.company ? ' (' + lead.company + ')' : '');
  const lines = [
    'A new lead has been assigned to you.',
    '',
    'Name:    ' + lead.name,
    'Email:   ' + lead.email,
    'Phone:   ' + (lead.phone || '-'),
    'Company: ' + (lead.company || '-'),
    'Source:  ' + (lead.source || '-'),
    '',
    'Message / need:',
    lead.message || '-',
    '',
    'Open the Leads sheet to work this lead: ' +
      SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ];
  MailApp.sendEmail({
    to: owner,
    cc: CONFIG.ALERT_CC || undefined,
    subject: '[' + CONFIG.BUSINESS_NAME + '] ' + subject,
    body: lines.join('\n')
  });
}

// ---------------------------------------------------------------------------
//  DASHBOARD — counts of leads per pipeline status.
// ---------------------------------------------------------------------------
function refreshDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const leads = ss.getSheetByName(CONFIG.LEADS_SHEET);
  const dash = ss.getSheetByName(CONFIG.DASHBOARD_SHEET);
  if (!leads || !dash) return;

  const counts = {};
  CONFIG.STATUSES.forEach(function (s) { counts[s] = 0; });
  const lastRow = leads.getLastRow();
  let total = 0;
  if (lastRow >= FIRST_DATA_ROW) {
    const statuses = leads.getRange(FIRST_DATA_ROW, COL.STATUS,
                                    lastRow - FIRST_DATA_ROW + 1, 1).getValues();
    statuses.forEach(function (r) {
      const s = String(r[0] || '');
      if (Object.prototype.hasOwnProperty.call(counts, s)) { counts[s]++; total++; }
    });
  }
  CONFIG.STATUSES.forEach(function (status, i) {
    dash.getRange(3 + i, 2).setValue(counts[status]);
  });
  dash.getRange(3 + CONFIG.STATUSES.length, 2).setValue(total).setFontWeight('bold');
  dash.getRange(5 + CONFIG.STATUSES.length, 2)
      .setValue(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'));
}
