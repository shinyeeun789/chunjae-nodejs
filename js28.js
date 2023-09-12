// update

const dbCon = require("./mariaDBConn");
const express = require("express");
const app = express();

let sample = ["신이름", 7];
dbCon.updateSample(sample)
    .then((msg) => {
        console.log(msg);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

let port = 4000;
app.listen(port, () => {
    console.log(`Server Starting on localhost:${port}`);
});