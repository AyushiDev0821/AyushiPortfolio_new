const name = "neha"
const repoCount = 50 
//console.log(name + repoCount + " value");


console.log(`Hello my name id ${name} and my repo count is ${repoCount}`);


const gameName = new String('neha-scd')

// console.log(gameName[0]);
// console.log(gameName.__proto__);


// console.log(gameName.length);
// console.log(gameName.toUpperCase());
// console.log(gameName.charAt(2));
//console.log(gameName.indexOf('c'));
const newString = gameName.substring(0 , 4)

//console.log(newString);


const anotherString = gameName.slice(-5 , 4)
//console.log(anotherString);

const newStringOne = "   Neha   "
// console.log(newStringOne);
// console.log(newStringOne.trim());


const url ="https://jmvd.com/admin%20site"

console.log(url.replace('%20' , '-'));
console.log(url);

console.log(url.includes('site'));
console.log(url.includes('neha'));



console.log(gameName.split('-'));






