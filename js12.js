const fs = require("fs");

fs.readFile('./shin.txt', 'utf-8', function(err, data) {
    console.log(data);                                                       
});