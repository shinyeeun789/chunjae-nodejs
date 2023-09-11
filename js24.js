// body-parser 설치 : npm install body-parser
// 회원 API
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const server = http.createServer(app);
const PORT = 4000;

let users = [
    {id:"kim", pw:"1234"},
    {id:"lee", pw:"4321"},
    {id:"park", pw:"7979"}
];

// 회원의 가입 여부 반환 함수
const findUserIndex = (id) => {             // findUserIndex("kim") -> 0
    let index = -1;
    let len = users.length;
    for(let i=0; i<len; i++) {
        if(users[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}

// 회원가입 함수
const register = (id, pw) => {              // register("choi", "2424")
    let idx = findUserIndex(id);
    if(idx !== -1) return false;
    
    // 회원가입
    users.push({id, pw});                   // 객체 배열 추가
    return true;
}

// 로그인 처리 함수
const login = (id, pw) => {
    let idx = findUserIndex(id);
    if(idx === -1 ) return false;           // 로그인 실패 - 없는 아이디
    if(users[idx].id === id && users[idx].pw === pw) return true;
    return false;                           // 로그인 실패 - 비밀번호가 맞지 않는 경우
}

// 비밀번호 변경
const changePw = (id, pw) => {
    let idx = findUserIndex(id);
    if (idx === -1) return false;
    users[idx].pw = pw;
    return true;
}

// 회원 탈퇴
const deleteUser = (id) => {
    let idx = findUserIndex(id);
    if (idx === -1) return false;
    users.splice(idx, 1);                   // 특정 인덱스로부터 1개의 데이터를 삭제하라
                                            // delete : 항목 하나하나 삭제
    return true;
}

// 정보 입력 - INSERT (POST)
app.post("/", (req, res) => {               // 폼 전송 (POST => body)
    let id = req.body.id;                   // 전송받은 데이터
    let pw = req.body.pw;
    
    if(!register(id, pw)) return res.status(401).send("중복된 아이디입니다.");
    res.send("회원가입을 축하합니다!");
});

// 정보 조회 - SelectOne (GET)
app.get("/:id", (req, res) => {             // GET => params
    let id = req.params.id;
    if(findUserIndex(id) === -1) return res.status(401).send("해당 회원이 존재하지 않습니다.");
    res.send(`Hello, ${id}님!`);
});

// 정보 변경 - UPDATE (PUT)
app.put("/:id", (req, res) => {
    let id = req.params.id;                 // parameter에 있으면 params로 받기
    let pw = req.body.pw;                   // parameter에 없으면 body로 받기
    if(!changePw(id, pw)) return res.status(401).send("비밀번호 변경 실패");
    res.send(`${id}님의 비밀번호가 성공적으로 변경되었습니다!`);
});

// 회원 탈퇴 - DELETE (DELETE)
app.delete("/:id", (req, res) => {
    let id = req.params.id;
    if(!deleteUser(id)) return res.status(401).send("회원 탈퇴 실패");
    res.send("회원 탈퇴 성공!");
});

// 로그인
app.post("/login", (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;
    if(!login(id, pw)) return res.status(401).send("로그인에 실패하였습니다.")
    res.send(`${id}님으로 로그인되었습니다.`);
});

server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});