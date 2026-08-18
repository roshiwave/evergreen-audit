/**
 * EverGreen AI Readiness Audit — Form Handler
 * 
 * SETUP:
 * 1. In Google Sheets: Extensions → Apps Script
 * 2. Paste this entire file.
 * 3. Click Deploy → New Deployment → Type: Web App
 * 4. Execute as: Me, Access: Anyone
 * 5. Copy the /exec URL → paste it into get-audit.html SUBMIT_URL
 *
 * Every submission appends a row: timestamp | name | firm | url | email
 * Column headers are auto-written on first run.
 */

const SHEET_NAME = "Submissions";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Write headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Firm", "Website", "Email"]);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.firm,
      data.url,
      data.email,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("EverGreen audit endpoint active.");
}