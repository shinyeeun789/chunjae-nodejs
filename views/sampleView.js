// sampleList
const dbCon = require("../model/sample");
const express = require("express");
const app = express();

let tmp1 = ``;
let tmp2 = ``;

app.get('/', (req, res) => {
    res.send("<h2> 메인 </h2>");
});

app.get('/list', (req, res) => {
    dbCon.getSampleList()
    .then((rows) => {
        res.send(rows);
    })
    .catch((errMsg) => {
        res.send(errMsg);
    });
});

app.get('/get/:no', (req, res) => {
    dbCon.getSampleList()
        .then((rows) => {

        })
        .catch((errMsg) => {
            res.send(errMsg);
        })
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server Starting on localhost:${port}`);
});