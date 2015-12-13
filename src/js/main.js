// mian.js

// @desc: CommonJs Module
// var bar = require('./foo')

// console.log(bar);  // Object
// console.log(bar.variable); // 8
// console.log(bar.sum(1)); // 7
// console.log(bar.square(5)); // 25


// @desc: ES6 Module
import {variable, sum, square} from './foo';
console.log(variable); // 8
console.log(sum(1)); // 7
console.log(square(5)); // 25
