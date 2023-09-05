// nodeJS에서 txt 파일 가져와서 출력하기
const fs = require("fs");                                   // file system
fs.readFile('./hello.txt', function(err, data) {                     // Node JS에서는 '' 많이 사용
    console.log(data);
});