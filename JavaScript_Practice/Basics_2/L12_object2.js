//const tinderUser = new Object() // Singleton object

const tinderUser ={} //NonSingleton object


tinderUser.id = "123abs"
tinderUser.name = "Samay"
tinderUser.isLoggedIn = false

//console.log(tinderUser);


const regularUser = {
    email: "samay@gmail.com",
    fullname: {userfullname: {
        firstname: "Samay",
        lastname: "Singh"
    }}
}

//console.log(regularUser.fullname.userfullname.firstname);

const object1 = {1: "a", 2: "b"}
const object2 = {3: "a", 4: "b"}
const object3 = {5: "a", 6: "b"}

//const object ={object1,object2}
//const object= Object.assign({},object1,object2,object3)

const object4 = {...object1, ...object2, ...object3}

//console.log(object4);



const users = [
     {
        id: 1,
        email: "neha@gmail.com"
    },
     {
        id: 1,
        email: "neha@gmail.com"
    },
     {
        id: 1,
        email: "neha@gmail.com"
    }
]

users[1].email

// console.log(tinderUser);
// console.log(Object.keys(tinderUser));
// console.log(Object.values(tinderUser));
// console.log(Object.entries(tinderUser));

// console.log(tinderUser.hasOwnProperty('isLoggedI'));


const course ={

    coursename: "JS IN HINDI",
    price: "999",
    courseInstructor: "Neha"

}

// course.courseInstructor

const {courseInstructor: Instroctor} = course

// console.log(courseInstructor);
console.log(Instroctor);


// const navbar = ({company}) => {


// }

// navbar(company="Neha")

/////// jason 
// {
//     "name":"neha",
//     "price":"free"
// }




   
