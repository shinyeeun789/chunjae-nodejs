var es5 = {
    name: '김이름',
    point: 100
};

let es6 = new Object();
es6.name = '김이름';
es6.point = 100;

console.log(`es5 : ${es5.name}, ${es5.point}`);
console.log(`es6 : ${es6.name}, {${es6.point}}`);
console.log(`es6 키에 의한 접근 : ${es6['name']}, ${es6['point']}`);

for(let item in es6) {
    console.log(`${item} : ${es6[item]}`);
}