// Primitive

// 7 Types : String, Number, Boolearn, null, undefined, Symbol, BigInt


const score = 100
const scoreValue = 100.3

const isLoggedIn = false
const outsideTemp = null
let userEmail;

const id = Symbol('123')
const anotherId = Symbol('123')

console.log(id === anotherId);

const bigNumber = 12588452254454n

// Referance Type or Non Primitive

// Array, Objects, Functions


const heros = ["Shaktiman" , "Naagraj" , "Doga"];

let myObj = {
        name: "Neha",
        age: 22,
}

const myFunction = function (){

    console.log("Hello World");
}

console.log(typeof outsideTemp);







// ***********************************************************************

// Stack Memory (Primitive) & Heap Memory (Non Primitive)


let myYoutubename = "nehasrivastava"

let anothername = myYoutubename

anothername = "chaiaursutta"

console.log(anothername);
console.log(myYoutubename);

let user = {
    name: "Neha",
    age: 22,
}


let user2 = user

user2.name = "Ayushi"

console.log(user.name);
console.log(user2.name);


