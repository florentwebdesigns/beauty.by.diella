/**
 * Beauty by Diella: inquiry log
 *
 * Saves every "Send inquiry" from the website as a row in this Google Sheet.
 * Setup: in the Sheet, Extensions > Apps Script, paste this file, then
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Copy the web app URL into SITE.inquiryLog in index.html.
 */
var SHEET_NAME = "Inquiries";
var HEADERS = ["Received", "Name", "Email", "Phone", "Event type", "Event date",
  "Location", "People", "Services", "Details", "Sent via", "Page"];

function doPost(e) {
  var p = (e && e.parameter) || {};
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  // Text only: a value starting with = + - @ would otherwise run as a formula.
  var clean = function (v) {
    v = String(v || "").slice(0, 2000);
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  };
  sh.appendRow([new Date(), clean(p.name), clean(p.email), clean(p.phone), clean(p.type),
    clean(p.date), clean(p.location), clean(p.people), clean(p.services), clean(p.msg),
    clean(p.via), clean(p.page)]);
  return ContentService.createTextOutput("ok");
}
