// getSample

const dbCon = require("./mariaDBConn");
const express = require("express");
const app = express();
dbCon.getSample(3)
    .then((row) => {
        console.log(row);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

let port = 4000;
app.listen(port, () => {
    console.log(`Server Starting on localhost:${port}`);
});