// insert

const dbCon = require("./mariaDBConn");
const express = require("express");
const app = express();

let sample = {name:'최이름'};

dbCon.insertSample(sample)
    .then((msg) => {
        console.log(msg);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

let port = 4000;
app.listen(port, () => {
    console.log(`Server Starting onlocalhost:${port}`);
});