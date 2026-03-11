
// var c = 300 // "Global-scoped variables can be accessed from anywhere in the program."


let a = 300

if(true){
    let a = 10
   const b = 20 
//    var c = 30    
   //console.log("INNER:" , a);
   
} // block-scopes


// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
    
// }

//console.log(a);
//console.log(b);
//console.log(c);

//*********************************************************/

function one() {

    const username = "Neha" 
    function two() {

        const website = "Youtube" // "Block-scoped variables can only be accessed within the block or function where they are declared."
        console.log(username);
        
    }

    //console.log(website);

    two()
    
    
}

//one()


if(true){

    const username = "Ayushi"

    if(username === "Ayushi") {

        const website = " Youtube"
        console.log(username + website);

    }

   // console.log(website);
    

}

//console.log(username);


// ++++++++++++++++++ interesting ++++++++++++++++++


console.log(addone(5))

function addone(num){
    return num + 1
}



// addTwo(5)
const addTwo = function(num){
    return num + 2
}

// addTwo(5)