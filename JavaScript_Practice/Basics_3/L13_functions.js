

function sayMyName(){
 console.log("N");
console.log("E");
console.log("H");
console.log("A");
}

// sayMyName()
                    // paramiters
// function addTwoNumbers(no1,no2){
 
//    console.log(no1+no2) ; // arguments
// }

// addTwoNumbers(3,8)

function addTwoNumbers(no1,no2){
 
//    let result=no1+no2
//    return result

     return no1 + no2
}

const result = addTwoNumbers(3,8)

// console.log("Result:" , result);


function loginUsers(username = "sam"){
    // if(username === undefined){

    //     console.log("Please enter a username");
    //     return
        
    // }

     if( !username){

        console.log("Please enter a username");
        return
        
    }
    return `${username} just login`
}

// console.log(loginUsers("Neha"));

//console.log(loginUsers()); //undefined


// function calculatecardPrice(...num1) {
//     return num1
// }

function calculatecardPrice(val1,val2,...num1) {
    return num1
}

// console.log(calculatecardPrice(200,400,500));

const user ={
    username: "Neha",
    price:199
}

function handelObject(anyobject) {
    
    console.log(`Username is ${anyobject.username} and price is ${anyobject.price}`);
    
}

// handelObject(user)
handelObject(
    {
        username: "Sam",
    price:199 
    }
)


const myNewArray = [200, 300, 400, 500]

function returnSecondValue(getArray) {

    return getArray[1]
    
}

console.log(returnSecondValue(myNewArray));
