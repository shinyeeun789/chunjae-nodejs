var test1 = [10,15,20,30,40,50];

// map(): 배열의 요소들이 조건식에 대하여 true인지 false인지 알고 싶을 경우
// console.log(test1.map(function(c) { return c<=20 }));            // [ true, true, true, false, false, false ]
console.log(test1.map(c => c<=20));                                 // [ true, true, true, false, false, false ]

// filter(): 조건에 맞는 배열의 요소만 return 받고 싶은 경우
// console.log(test1.map(c => { if(c<=20) return c}));              // [ 10, 15, 20, undefined, undefined, undefined ]
console.log(test1.filter(c => { if(c<=20) return c}));              // [ 10, 15, 20 ]