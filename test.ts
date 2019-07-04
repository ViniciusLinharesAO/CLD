const a = [1,2,3];
console.log(a);
let b = [];
b = [...a];
b.push(4);
console.log('b ', b)
console.log(a)
b = [...a];
console.log('b2 ', b)
