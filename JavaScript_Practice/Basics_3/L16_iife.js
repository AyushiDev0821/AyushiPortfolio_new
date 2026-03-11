// Immediately Invoked Function Expressions (IIFE)

(function chai() {

    // Named IIFE 

    console.log(`DB CONNECTED`);
    
    
}) (); 

// Globle Scope ke pollutions se problem hoti h kayi bar to jo us globle scope 
// vribles h ....koi declaretion h to uske pollution ko kyi bar htane ke liye IIFE ka use krte h

( (name) =>  {
       
    // Simple IIFE

    console.log(`DB CONNECTED TWO ${name}`);

})('Neha')


// agar iife ko kyi bar use krna hai to pahele vale function ko ; lga kr rokn hota h
