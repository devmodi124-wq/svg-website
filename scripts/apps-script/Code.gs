/**
 * Shree Vinayak Gas — enquiry form receiver.
 *
 * Deployed as a Google Apps Script web app. The website POSTs a JSON enquiry
 * here and this appends a row to the bound spreadsheet, which doubles as the
 * lead register.
 *
 * Setup instructions: see README.md in this folder.
 */

/** Column order in the sheet. Change here and the header rewrites itself. */
var COLUMNS = [
  'Received',
  'Name',
  'Phone',
  'Company',
  'Gas',
  'Quantity & frequency',
  'Message',
  'Page',
  'Status',
];

/** Email address that gets notified on each new enquiry. Blank disables it. */
var NOTIFY_EMAIL = 'shreevinayakgases@gmail.com';

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    // The website's honeypot should catch bots, but check again here — this
    // endpoint is public and will be found by scrapers eventually.
    if (payload.website) {
      return json({ ok: true });
    }

    var sheet = getSheet();

    sheet.appendRow([
      formatTimestamp(payload.submittedAt),
      payload.name || '',
      normalisePhone(payload.phone),
      payload.company || '',
      payload.gas || '',
      payload.quantity || '',
      payload.message || '',
      payload.page || '',
      'New',
    ]);

    notify(payload);

    return json({ ok: true });
  } catch (error) {
    console.error('Enquiry failed: ' + error);
    return json({ ok: false, error: String(error) });
  }
}

/**
 * Apps Script does not answer CORS preflight requests, which is why the site
 * sends text/plain. This handler exists so a browser that probes with GET gets
 * something sensible rather than an error page.
 */
function doGet() {
  return json({ ok: true, service: 'Shree Vinayak Gas enquiry endpoint' });
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

function getSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Enquiries');

  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Enquiries');
  }

  // Write the header row once, and keep it frozen and readable.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    var header = sheet.getRange(1, 1, 1, COLUMNS.length);
    header.setFontWeight('bold');
    header.setBackground('#17324D');
    header.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(7, 300);
  }

  return sheet;
}

/** Renders the ISO timestamp in IST, which is what you actually read it in. */
function formatTimestamp(iso) {
  var date = iso ? new Date(iso) : new Date();
  return Utilities.formatDate(date, 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a');
}

/**
 * Keeps the phone as text. Without the leading apostrophe Sheets strips the
 * leading zero or the plus and mangles the number.
 */
function normalisePhone(phone) {
  if (!phone) return '';
  return "'" + String(phone).trim();
}

function notify(payload) {
  if (!NOTIFY_EMAIL) return;

  var lines = [
    'New enquiry from the website.',
    '',
    'Name:     ' + (payload.name || '—'),
    'Phone:    ' + (payload.phone || '—'),
    'Company:  ' + (payload.company || '—'),
    'Gas:      ' + (payload.gas || '—'),
    'Quantity: ' + (payload.quantity || '—'),
    '',
    'Message:',
    payload.message || '—',
    '',
    'Received: ' + formatTimestamp(payload.submittedAt),
    'Page:     ' + (payload.page || '—'),
  ];

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New enquiry: ' + (payload.gas || 'Gas supply') + ' — ' + (payload.name || 'Website'),
    body: lines.join('\n'),
    // Replying goes straight to the customer rather than to yourself.
    replyTo: payload.email || NOTIFY_EMAIL,
  });
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
