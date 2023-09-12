// delete

const dbCon = require("./mariaDBConn");
const express = require("express");
const app = express();

let no = 7;
dbCon.deleteSample(no)
    .then(() => {
        console.log(`${no}번이 삭제되었습니다.`);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

let port = 4000;
app.listen(port, () => {
    console.log(`Server Starting on localhost:${port}`);
});