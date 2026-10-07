/**
 * Beauty by Diella: Instagram booking form (Google Forms)
 *
 * 1. Go to script.google.com > New project. Delete everything, paste this whole file, Cmd+S.
 * 2. In the toolbar, pick "createBookingForm" in the function dropdown and click Run.
 *    Authorize it (Advanced > Go to project > Allow).
 * 3. Open View > Logs (or the Execution log). It prints the form's share link
 *    for the Instagram bio, plus the edit link.
 * Every new response is emailed to Diella and saved in the form's Responses tab.
 */
var DIELLA_EMAIL = "diellaborici@gmail.com";
var DIELLA_PHONE = "(973) 380-2511";

function createBookingForm() {
  var form = FormApp.create("Book with Beauty by Diella")
    .setDescription("Makeup artistry for bridal, special events, photoshoots and editorial work. " +
      "Based in Springfield, NJ, serving New Jersey and New York City.\n\n" +
      "Share a few details and Diella will reach out with availability.")
    .setConfirmationMessage("Thank you! Diella will reach out shortly. For anything urgent, text " + DIELLA_PHONE + ".")
    .setCollectEmail(false)
    .setAllowResponseEdits(false);

  form.addTextItem().setTitle("Full name").setRequired(true);
  form.addTextItem().setTitle("Phone number").setHelpText("So Diella can text you back").setRequired(true);
  form.addTextItem().setTitle("Email").setRequired(false);
  form.addMultipleChoiceItem().setTitle("Event type")
    .setChoiceValues(["Bridal / Wedding", "Special Event", "Photoshoot", "Editorial", "Glam", "Other"])
    .setRequired(true);
  form.addDateItem().setTitle("Event date").setRequired(false);
  form.addTextItem().setTitle("Event location (town or venue)").setRequired(false);
  form.addTextItem().setTitle("Number of people needing makeup").setRequired(false);
  form.addCheckboxItem().setTitle("Services needed")
    .setChoiceValues(["Makeup", "Lashes", "Trial", "Touch-ups / on-site", "Not sure yet"])
    .setRequired(false);
  form.addParagraphTextItem().setTitle("Anything else Diella should know?").setRequired(false);

  ScriptApp.newTrigger("emailDiella").forForm(form).onFormSubmit().create();

  var link = form.getPublishedUrl();
  try { link = form.shortenFormUrl(link); } catch (err) {}
  Logger.log("Instagram link: " + link);
  Logger.log("Edit the form: " + form.getEditUrl());
}

function emailDiella(e) {
  var lines = [], name = "", type = "", phone = "";
  e.response.getItemResponses().forEach(function (r) {
    var title = r.getItem().getTitle(), answer = r.getResponse();
    if (Array.isArray(answer)) answer = answer.join(", ");
    if (!answer) return;
    if (title === "Full name") name = answer;
    if (title === "Event type") type = answer;
    if (title === "Phone number") phone = answer;
    lines.push(title + ": " + answer);
  });
  MailApp.sendEmail({
    to: DIELLA_EMAIL,
    subject: "New booking request: " + type + " · " + name,
    body: "New booking request from the Instagram form.\n\n" + lines.join("\n") +
      (phone ? "\n\nText them back: sms:" + phone.replace(/[^\d+]/g, "") : "")
  });
}
