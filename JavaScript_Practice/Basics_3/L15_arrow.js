const user = {

    umane:"Neha",
    price:999,
    wlcomemsg: function () {

        console.log(`${this.umane}, welcome to website.`);
        console.log(this);
        
        }
}

// console.log(user.wlcomemsg)

// user.wlcomemsg()
// user.umane = "Ayushi"
// user.wlcomemsg()

// console.log(this);


// function chai() {

//     let unames ="Neha"

//     console.log(this.unames); // functions ke andr this use nhi hota
    
    
// }

// chai()


// const chai = function() {

//     let unames ="Neha"

//     console.log(this.unames)

    
// }


const chai = () => {

    let unames ="Neha"

    console.log(this.unames)

    
}

// chai()



// const addTwo2 = (num1 , num2) => {

//     return num1 + num2
// } 


// const addTwo2 = (num1 , num2) =>  num1 + num2

// const addTwo2 = (num1 , num2) =>  (num1 + num2)

const addTwo2 = (num1 , num2) =>  ({unames: "Neha"})


console.log(addTwo2(3,4));


// const myArray = [2,3,4,5,6,7]

// myArray.forEach(() => ())