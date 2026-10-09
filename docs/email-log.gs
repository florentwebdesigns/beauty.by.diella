/**
 * Beauty by Diella: email log
 * Saves every tap on "Email Diella", her email address or "Copy email" on the website
 * as a row in the "Emails" tab.
 * Setup: from the Google Sheet, Extensions > Apps Script, paste this into Code.gs,
 * then Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy.
 */
var EMAIL_HEADERS = ["Received", "Action", "Button tapped", "Section", "Device", "Page"];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName("Emails") || ss.insertSheet("Emails");
  if (sh.getLastRow() === 0) { sh.appendRow(EMAIL_HEADERS); sh.setFrozenRows(1); }
  var clean = function (v) { v = String(v || "").slice(0, 500); return /^[=+\-@]/.test(v) ? "'" + v : v; };
  sh.appendRow([new Date(), clean(p.action), clean(p.button), clean(p.section), clean(p.device), clean(p.page)]);
  return ContentService.createTextOutput("ok");
}
