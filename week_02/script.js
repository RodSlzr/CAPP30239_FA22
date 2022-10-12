// integer

/*
this is a block comment
*/


let num = 100; //integer
let num1 = 200;

//function foo() {
//    console.log(num);
//};

console.log(num1);

let anonFun = function() {
    console.log("hello");
};

(function() {
    console.log("Hello");
})();

(() => console.log(100))();

//function foo() {
//    console.log(num);
//};

let foo = () => console.log(num); // another way to declare the function, like shorter.

foo = () => console.log(num1);

let bar = 100;
bar = 200;



let arr = ['foo', 123, ['zar', 'car']];

// Set item in array
//arr[1] = 'barbar';

// Add item to the end of the array
//arr.push('par')

// Removing an item from the array (index, number of values to delete from the index and after)
arr.splice(1, 2);

console.log(arr);

let newArr = ['cow', 'turtle', 'coat'];

for (let item of newArr) {
    console.log(item);
}

for (let i in newArr) {
    console.log(i + ' ' + newArr[i]);
}

newArr. forEach((item, i) => console.log(i + ' ' + item));

// Objects

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

// Access property
console.log(obj1.name);
console.log(obj1['name']);

// Set value
obj1.job = "Barista";

// Loop through all properties
for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key}: ${value}`);
};

let fall = 72;
console.log(typeof fall)

// let str = 'Hello' + key + 'more text here' + foo;
// let str = `Hello ${key} more text here ${foo};`

let val = 80;

let y = (val >= 80) ? console.log("good") : console.log("bad");

let newVar = document.getElementById("example");

newVar.innerHTML += '<h1>Hello World!</h1><p>new paragraph ${num} </p>'