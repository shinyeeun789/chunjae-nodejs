// 비동기식으로 텍스트 파일에 글 쓰기
const fs = require("fs");
let content = '파일 쓰기 테스트 중';
/*
fs.writeFile('./shin2.txt', content, (err) => {
    fs.readFile('./shin2.txt', 'utf8', (err, data) => {
        console.log(data);
    });
});

fs.writeFileSync('./shin3.txt', content);
var data = fs.readFileSync('./shin3.txt','utf8');
console.log(data);

// 내용 추가
fs.readFile('./shin2.txt', 'utf8', (err, data) => {
    let con = data + " 내용 추가";
    fs.writeFile('./shin2.txt', con, (err) => {
        console.log(con);
    });
});


// 비동기식으로 처리된 텍스트 파일의 이름 바꾸기
fs.rename('./shin2.txt', './kim2.txt', (err) => {
    console.log('파일 이름 변경');
});

// 동기식으로 처리된 텍스트 파일의 이름 바꾸기
fs.renameSync('./shin2.txt', './lee2.txt');

// 파일 삭제
fs.unlink('./kim2.txt', (err) => {
    console.log("파일 삭제");
});
fs.unlinkSync('./kim2.txt');
*/