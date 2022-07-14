const {google} = require('googleapis');
const express = require('express');
const app = express();
app.get("/", async (req,res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })



    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1hVjrT8ebV75jn-e0DGd6kwqaGB-ahwUPfm_YRL6rdkE";

    const data = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:"Sheet1"
    });


    res.send(getRows.data.values[1][1]);
});

app.listen(1337, (req, res) => console.log("running on 1337"));