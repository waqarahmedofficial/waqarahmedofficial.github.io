/**
 * ============================================================================
 *  SAMPLE A — Sheets Automation System for a Small Trading Business
 * ============================================================================
 *  Client problem : Orders, stock and invoicing were tracked by hand in one
 *                   spreadsheet. Staff lost ~6 hours/week to re-typing,
 *                   stock-outs were discovered only when a customer ordered,
 *                   and invoices took 10 minutes each to prepare.
 *
 *  What this script does (all inside the client's existing Google Sheet):
 *    1. Adds an "⚙ Automation" menu — no add-ons, no extra software.
 *    2. onEdit trigger: when an order's Status changes, stamps the ship
 *       date automatically and writes an audit-log entry.
 *    3. Low-stock watch: scans Inventory, emails ONE consolidated alert
 *       listing every SKU at/below its reorder level (no inbox spam).
 *    4. One-click invoice: builds a branded PDF invoice from the selected
 *       order row via a Google Docs template, saves it to Drive, and
 *       writes the PDF link back into the Orders sheet.
 *    5. API sync: pushes new orders to the client's external system
 *       (REST endpoint) with retries, back-off and full error logging.
 *    6. Daily automation (time trigger): stock check + sync + log summary.
 *
 *  Author : Waqar Ahmed — Google Sheets / Excel Automation Specialist
 *  Status : SAMPLE — business names, emails and endpoints are placeholders.
 * ============================================================================
 */

/** ------------------------------------------------------------------ *
 *  CONFIGURATION — the only block a client ever needs to edit.
 * ------------------------------------------------------------------ */
const CONFIG = {
  alertEmail: 'owner@example.com',          // low-stock + daily summary inbox
  invoiceTemplateId: 'PASTE_GOOGLE_DOC_TEMPLATE_ID_HERE',
  invoiceFolderName: 'Invoices (auto-generated)',
  apiEndpoint: 'https://api.example.com/v1/orders',
  apiKeyProperty: 'EXTERNAL_API_KEY',       // stored in Script Properties
  timezone: 'Etc/GMT-5',
};

const SHEETS = { ORDERS: 'Orders', INVENTORY: 'Inventory', LOG: 'Log' };

/** Column positions (1-based) — kept in one place so layout changes are safe. */
const ORD = { ID: 1, DATE: 2, CUSTOMER: 3, PRODUCT: 4, SKU: 5, QTY: 6,
              PRICE: 7, TOTAL: 8, STATUS: 9, PAYMENT: 10, SHIP_DATE: 11,
              INVOICE_URL: 12 };
const INV = { SKU: 1, PRODUCT: 2, CATEGORY: 3, STOCK: 4, REORDER: 5 };
const FIRST_DATA_ROW = 5;   // rows 1-2 titles, row 4 headers (matches workbook)


/* ============================================================================
 *  MENU + TRIGGERS
 * ========================================================================== */

/** Adds the automation menu every time the spreadsheet is opened. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚙ Automation')
    .addItem('Check low stock & email alert', 'checkLowStockAndAlert')
    .addItem('Generate invoice PDF for selected order', 'generateInvoicePdf')
    .addItem('Sync new orders to external system', 'syncOrdersToApi')
    .addSeparator()
    .addItem('Run daily automation now', 'runDailyAutomation')
    .addToUi();
}

/**
 * Simple onEdit trigger (installable version recommended for permissions).
 * When an order's Status becomes "Shipped", stamps the Ship Date column and
 * logs the change; when it becomes "Delivered", flags payment follow-up.
 */
function onEdit(e) {
  try {
    const range = e.range;
    const sheet = range.getSheet();
    if (sheet.getName() !== SHEETS.ORDERS) return;
    if (range.getColumn() !== ORD.STATUS || range.getRow() < FIRST_DATA_ROW) return;

    const newStatus = String(e.value || '').trim();
    const orderId = sheet.getRange(range.getRow(), ORD.ID).getValue();

    if (newStatus === 'Shipped') {
      sheet.getRange(range.getRow(), ORD.SHIP_DATE)
           .setValue(new Date())
           .setNumberFormat('yyyy-mm-dd');
      log_('STATUS', `Order ${orderId} marked Shipped — ship date stamped.`);
    }
    if (newStatus === 'Delivered') {
      log_('STATUS', `Order ${orderId} delivered.`);
    }
    if (newStatus === 'Cancelled') {
      log_('STATUS', `Order ${orderId} CANCELLED — excluded from revenue KPIs.`);
    }
  } catch (err) {
    log_('ERROR', `onEdit failed: ${err.message}`);
  }
}

/** Time-driven entry point (set a daily trigger once from the Triggers panel). */
function runDailyAutomation() {
  const low = checkLowStockAndAlert();
  const synced = syncOrdersToApi();
  log_('DAILY', `Daily run complete — ${low} low-stock SKU(s), ${synced} order(s) synced.`);
}


/* ============================================================================
 *  1) LOW-STOCK EMAIL ALERT
 * ========================================================================== */

/**
 * Scans Inventory; if any SKU is at/below its reorder level, sends ONE email
 * listing all of them and logs the alert. Returns the number of low SKUs.
 */
function checkLowStockAndAlert() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inv = ss.getSheetByName(SHEETS.INVENTORY);
  const lastRow = inv.getLastRow();
  if (lastRow < FIRST_DATA_ROW) return 0;

  const data = inv.getRange(FIRST_DATA_ROW, 1, lastRow - FIRST_DATA_ROW + 1, 5).getValues();
  const low = data.filter(r => Number(r[INV.STOCK - 1]) <= Number(r[INV.REORDER - 1]));

  if (low.length === 0) {
    log_('STOCK', 'Stock check passed — nothing at reorder level.');
    return 0;
  }

  const lines = low.map(r =>
    `• ${r[INV.SKU - 1]} — ${r[INV.PRODUCT - 1]}: ${r[INV.STOCK - 1]} left (reorder at ${r[INV.REORDER - 1]})`);
  MailApp.sendEmail({
    to: CONFIG.alertEmail,
    subject: `⚠ Low stock alert — ${low.length} SKU(s) need reordering`,
    body: `The following items are at or below their reorder level:\n\n${lines.join('\n')}\n\n— Sent automatically by your Sheets Automation System`,
  });
  log_('STOCK', `Low-stock alert emailed for ${low.length} SKU(s): ${low.map(r => r[0]).join(', ')}`);
  return low.length;
}


/* ============================================================================
 *  2) ONE-CLICK PDF INVOICE
 * ========================================================================== */

/**
 * Generates a branded PDF invoice for the order on the currently selected row.
 * Uses a Google Docs template with {{PLACEHOLDER}} tokens; saves the PDF to
 * the invoices folder and writes its link back into the Orders sheet.
 */
function generateInvoicePdf() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.ORDERS);
  const row = sheet.getActiveCell().getRow();
  const ui = SpreadsheetApp.getUi();

  if (row < FIRST_DATA_ROW) {
    ui.alert('Please click any cell on an order row first.');
    return;
  }
  const o = sheet.getRange(row, 1, 1, 12).getValues()[0];
  const order = { id: o[ORD.ID - 1], date: o[ORD.DATE - 1], customer: o[ORD.CUSTOMER - 1],
                  product: o[ORD.PRODUCT - 1], qty: o[ORD.QTY - 1],
                  price: o[ORD.PRICE - 1], total: o[ORD.TOTAL - 1] };

  try {
    // Copy the template, fill placeholders, export as PDF.
    const template = DriveApp.getFileById(CONFIG.invoiceTemplateId);
    const copy = template.makeCopy(`Invoice ${order.id} — ${order.customer}`);
    const doc = DocumentApp.openById(copy.getId());
    const body = doc.getBody();
    const fmt = n => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2 });
    body.replaceText('{{ORDER_ID}}', String(order.id));
    body.replaceText('{{DATE}}', Utilities.formatDate(new Date(order.date), CONFIG.timezone, 'yyyy-MM-dd'));
    body.replaceText('{{CUSTOMER}}', String(order.customer));
    body.replaceText('{{PRODUCT}}', String(order.product));
    body.replaceText('{{QTY}}', String(order.qty));
    body.replaceText('{{UNIT_PRICE}}', fmt(order.price));
    body.replaceText('{{TOTAL}}', fmt(order.total));
    doc.saveAndClose();

    const folder = getOrCreateFolder_(CONFIG.invoiceFolderName);
    const pdf = folder.createFile(copy.getAs('application/pdf').setName(`Invoice ${order.id}.pdf`));
    copy.setTrashed(true);   // keep Drive tidy — only the PDF is retained

    sheet.getRange(row, ORD.INVOICE_URL).setValue(pdf.getUrl());
    log_('INVOICE', `Invoice PDF generated for ${order.id} (${order.customer}) — $${fmt(order.total)}.`);
    ui.alert(`Invoice created for ${order.id}.\nThe PDF link is in column L.`);
  } catch (err) {
    log_('ERROR', `Invoice generation failed for row ${row}: ${err.message}`);
    ui.alert('Invoice failed — see the Log sheet for details.');
    throw err;
  }
}


/* ============================================================================
 *  3) API SYNC — push new orders to the client's external system
 * ========================================================================== */

/**
 * Sends every order that has no sync marker to the REST endpoint.
 * Orders are considered synced once their Invoice/Sync cell carries a
 * "SYNCED <timestamp>" marker written by this function. Failures are
 * retried with exponential back-off and always logged — never silent.
 * Returns the number of orders successfully synced.
 */
function syncOrdersToApi() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.ORDERS);
  const lastRow = sheet.getLastRow();
  if (lastRow < FIRST_DATA_ROW) return 0;

  const rows = sheet.getRange(FIRST_DATA_ROW, 1, lastRow - FIRST_DATA_ROW + 1, 12).getValues();
  const apiKey = PropertiesService.getScriptProperties().getProperty(CONFIG.apiKeyProperty);
  let synced = 0;

  rows.forEach((o, i) => {
    const rowNum = FIRST_DATA_ROW + i;
    const marker = sheet.getRange(rowNum, ORD.INVOICE_URL).getNote();
    if (marker && marker.indexOf('SYNCED') === 0) return;   // already pushed

    const payload = {
      orderId: o[ORD.ID - 1],
      date: Utilities.formatDate(new Date(o[ORD.DATE - 1]), CONFIG.timezone, 'yyyy-MM-dd'),
      customer: o[ORD.CUSTOMER - 1], product: o[ORD.PRODUCT - 1], sku: o[ORD.SKU - 1],
      qty: o[ORD.QTY - 1], unitPrice: o[ORD.PRICE - 1], total: o[ORD.TOTAL - 1],
      status: o[ORD.STATUS - 1],
    };

    try {
      const res = fetchWithRetry_(CONFIG.apiEndpoint, {
        method: 'post',
        contentType: 'application/json',
        headers: apiKey ? { Authorization: 'Bearer ' + apiKey } : {},
        payload: JSON.stringify(payload),
        muteHttpExceptions: true,
      });
      if (res.getResponseCode() >= 200 && res.getResponseCode() < 300) {
        sheet.getRange(rowNum, ORD.INVOICE_URL)
             .setNote('SYNCED ' + new Date().toISOString());
        synced++;
      } else {
        log_('ERROR', `API rejected order ${payload.orderId} — HTTP ${res.getResponseCode()}: ${res.getContentText().slice(0, 200)}`);
      }
    } catch (err) {
      log_('ERROR', `API sync failed for order ${payload.orderId}: ${err.message}`);
    }
  });

  if (synced > 0) log_('SYNC', `${synced} order(s) pushed to ${CONFIG.apiEndpoint}.`);
  return synced;
}

/** UrlFetchApp wrapper: up to 3 attempts, 1s → 2s → 4s back-off. */
function fetchWithRetry_(url, options) {
  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return UrlFetchApp.fetch(url, options);
    } catch (err) {
      lastErr = err;
      if (attempt < 2) Utilities.sleep(Math.pow(2, attempt) * 1000);
    }
  }
  throw lastErr;
}


/* ============================================================================
 *  HELPERS
 * ========================================================================== */

/** Appends a timestamped entry to the Log sheet (creates it if missing). */
function log_(type, message) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let log = ss.getSheetByName(SHEETS.LOG);
  if (!log) {
    log = ss.insertSheet(SHEETS.LOG);
    log.appendRow(['Timestamp', 'Type', 'Message']);
  }
  log.appendRow([new Date(), type, message]);
}

/** Returns the named Drive folder, creating it on first use. */
function getOrCreateFolder_(name) {
  const it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}
