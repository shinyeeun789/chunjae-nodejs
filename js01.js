var a = 20;         // 재선언O, 변수값변경O
let b = 20;         // 재선언X, 변수값변경O
const c = 20;       // 재선언X, 변수값변경X

// 백틱(backtick = ``)으로 감싼 문장 => 템플릿
console.log("Hello~! NodeJS~!");
console.log("var a : " + a + ", let b : " + b + ", const c : " + c);
console.log(`var a : ${a}, let b : ${b}, const c : ${c}`);