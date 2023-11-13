const {log} = console;
// Array destructure is when you unpack an array and object and assigned them to a distinct value
// This is position based
const num = [1, 2, 3]; 

//becomes 1,2,3

const [numOne, numTwo, numThree] = num;

log(numOne, "num1");          //note there is no space btw the bracket and log.
log(numTwo, "num2");
log(numThree, "num3");

const arr = ["John", "Moji", "Dayo", "Ngozi"];
const [One, Two, Three, Four] = arr;
const [a, b, c, d] = arr;

log(a, "a");
log(b, "b");
log(One, "One");
log(Four, "Four");

// Destructure of specific index. skip valuues using comma
// the commas represent other elements in that position
const [first, , ,last] = arr;
log(first, "first");
log(last, "last");

// // default value in destructuring
// const anotherArr = [undefined, 1, 2, 3, 4, 5];
// const [x = "20", y, g, h, f, k] = anotherArr;  
// log(x, "x"); //x is 20 because default value is set to 20

const anotherArr = [30, 1, 2, 3, 4, 5];
const [x = "20", y, g, h, f, k] = anotherArr;
log(x, "x"); //x is 30 because default value is set to 30

// spread operator (...) while restructuring
const [data_1, data_2, data_3, ...rest] = anotherArr;
log(rest, "rest");

// Destructure during iteration for arrays
const countries = [
    ["Lagos", "ikeja"],
    ["Ondo","Akure"],
    ["Osun","Osogbo"],
];
for (let country of countries){
    log(country, "country");
}
// To destructure the above
for (let [state, capital] of countries ){
    log(state, capital, "country");
}

// object destructuring
const person = {
name: "John",
age: 20,
color: "blue",
}; 

// to destructure from the above object. this is not position based and it has keys and values
const {name, age, color, fav} = person;
log(name, age, color, fav, "person");

// renaming during restructuring
const {name: nm, age: ag, color: cl, fav: fv} = person;
log(nm, ag, cl);

// setting default when the key is not present
const {name: n, friend = "John"} = person;
log(friend, "friend");

// copy using spread operator
const even = [2, 4, 6, 8, 10];
const evenCopy = [...even];
const odd = [1, 3, 5, 7, 9, 11];
const oddCopy = [...odd];
log(evenCopy, "evenCopy");
log(oddCopy, "oddCopy");

// spread operator to copy an object
const personCopy = {...person};
log(personCopy, "personCopy");
