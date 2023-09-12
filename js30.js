const dbCon = require("./model/sample.js");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));
let title = "";
let tmp1 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>샘플</title>
</head>
<body>
    <ul>
        <li><a href="/list">목록</a></li>
        <li><a href="/addSample">샘플 추가</a></li>
    </ul>
    <hr>
`;
let tmp2 = `</body>
</html>`;
let updateTmp1 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Sample</title>
</head>
<body>
    <ul>
        <li><a href="/list">목록</a></li>
        <li><a href="/addSample">샘플 추가</a></li>
    </ul>
    <form action="/editSamplePro" method="post">`;
let updateTmp2 = `<p><input type="submit"></p>
</form>
</body>
</html>`;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/sampleMain.html");
});
app.get('/list', (req, res) => {
    title = `<h2>샘플 항목</h2>`;
    let li = `<ul>`;
    dbCon.getSampleList()
        .then((rows) => {
            rows.forEach((row) => {
                li = li + `<li><a href="/get/${row.NO}">${row.NAME}</a></li>`;
            });
            li = li + `</ul>`;
            res.send(tmp1+title+li+tmp2);
        })
        .catch((errMsg) => {
            res.send(tmp1+title+errMsg+tmp2);
        });
});
app.get('/get/:no', (req, res) => {
    title = `<h2>샘플 상세보기</h2>`;
    let body = "";
    dbCon.getSample(req.params.no)
        .then((rows) => {
            rows.forEach((row) => {
                body = `<p>no : ${row.NO}, name : ${row.NAME }</p>`
                body = body + `<a href="/editSample/${row.NO}"> 수정 </a><a href="/deleteSample/${row.NO}"> 삭제 </a>`
                res.send(tmp1+title+body+tmp2);
            });
        })
        .catch((errMsg) => {
            res.send(errMsg);
        });
});

app.get('/addSample', (req, res) => {
    res.sendFile(__dirname + "/sampleForm.html");
});

app.post('/addSamplePro', (req, res) => {
    let sample = {no:req.body.no, name:req.body.name};
    dbCon.insertSample(sample)
    .then((msg) => {
        console.log(msg);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });
    res.sendFile(__dirname + "/sampleMain.html");
});

app.get('/editSample/:no', (req, res) => {
    title = "<h2> 샘플 수정하기 </h2>";
    let body = "";
    dbCon.getSample(req.params.no)
        .then((row) => {
            row.forEach(index => {
                body = `<p><input type="hidden" name="no" value="${index.NO}" placeholder="no hidden"></p>
                <p><input type="text" name="name" value="${index.NAME}" placeholder="name input"></p>`;
            });
            res.send(updateTmp1+title+body+updateTmp2);
        })
        .catch((errMsg) => {
            res.send(tmp1+title+errMsg+temp2);
        });
});

app.post('/editSamplePro', (req, res) => {
    title = "<h2> 샘플 수정하기 </h2>";
    let sample = [req.body.name, req.body.no];
    dbCon.updateSample(sample)
        .then((msg) => {
            console.log(msg);
        })
        .catch((errMsg) => {
            console.log(errMsg);
        });
    res.sendFile(__dirname + "/sampleMain.html");
});

app.get('/deleteSample/:no', (req, res) => {
    title = "<h2> 샘플 삭제하기 </h2>";
    dbCon.deleteSample(req.params.no)
        .then((msg) => {
            console.log(msg);
        })
        .catch((errMsg) => {
            console.log(errMsg);
        });
    res.sendFile(__dirname + "/sampleMain.html");
});

let port = 4000;
app.listen(port, () => {
    console.log(`Sever Starting on ${port}`);
});