// npm install mariadb
const dbCon = require("./mariaDBConn");
const express = require("express");
const app = express();

dbCon.getSampleList()
    .then((rows) => {
        rows.map((tuple) => {
            console.log(tuple);
        })
        // console.log(rows);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

const port = 4000;
app.listen(port, () => {
    console.log(`Server Starting on localhost:${port}`);
});