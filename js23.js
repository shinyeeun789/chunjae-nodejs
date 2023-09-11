// npm install express => express 설치
// express는 Node보다 더 구조적으로 웹페이지를 만들 수 있음
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const PORT = 4000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get('/sub1', (req, res) => {
    res.sendFile(__dirname + "/sub.html");
});
app.get('/detail', (req, res) => {
    res.sendFile(__dirname + "/detail.html");
});

server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});