const express = require("express");
const bodyParser = require("body-parser");
const disks = require("./discs");
const api = require("./api");
const app = express();

app.use( express.static("public") );
app.use( bodyParser.json() );
app.use("/api", api);

app.listen(8080, function() {

    console.log("Serwer został uruchomiony pod adresem http://localhost:8080");

});



















