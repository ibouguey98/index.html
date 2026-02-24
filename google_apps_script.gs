/**
 * Apps Script Web App to collect contact form submissions into Google Sheets.
 *
 * Instructions:
 * 1. Créez une feuille Google Sheets et notez son ID (dans l'URL).
 * 2. Ouvrez https://script.google.com, créez un nouveau projet, collez ce fichier.
 * 3. Remplacez SPREADSHEET_ID ci-dessous par l'ID de votre feuille.
 * 4. Publiez -> Déployer comme application Web (ou Deploy > New deployment)
 *    - Exécuter l'application en tant que: "Moi"
 *    - Qui a accès à l'application: "Anyone" (ou "Anyone, even anonymous")
 * 5. Copiez l'URL du Web App (elle ressemble à https://script.google.com/macros/s/xxxx/exec)
 * 6. Collez cette URL dans `contact.html` à la constante `WEBHOOK_URL`.
 */

const SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1';

function doPost(e){
  try{
    const contents = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    const row = [new Date(), contents.name||'', contents.email||'', contents.phone||'', contents.message||''];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
