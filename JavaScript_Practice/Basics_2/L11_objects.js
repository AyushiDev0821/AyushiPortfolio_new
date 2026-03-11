// Objects

//// Singleton
// oblject.create



// object literals

const mySym = Symbol("key1")

const JsUser = {
    name: "Neha",
    "Full Name": "Neha Srivastava",
    age: 18,
    [mySym]: "mykey1",
    email: "neha@123.com",
    isLoggedIn: false,
    location: "Lucknow",
    lastLoggingDays: ["Monday", "Sunday"]

}


// console.log(JsUser.email);
// console.log(JsUser["email"]);
// console.log(JsUser["Full Name"]);
// // console.log(typeof JsUser.mySym);
// console.log(JsUser[mySym]);


JsUser.email = "nehaA@12.com"
//Object.freeze(JsUser)

JsUser.email = "neha1@12.com"
//console.log(JsUser);

JsUser.greeting = function(){
    console.log("Hello JS user")
}

JsUser.greetingTwo = function(){
    console.log(`Hello JS user ${this.name}`)
}

console.log(JsUser.greeting());
console.log(JsUser.greetingTwo());

