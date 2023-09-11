const http = require('http');           // Node
const express = require('express');     // Express

// express의 엔진 호출 (생성자)
const app = express();
const server = http.createServer(app);
const PORT = 4000;

app.get('/', (req, res) => {
    res.send('Hello Express');
});

server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});