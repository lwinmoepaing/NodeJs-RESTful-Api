/**
|--------------------------------------------------
| Comparison Operators
|--------------------------------------------------
*/

// ==	equal to
// ===	equal value and equal type
// !=	not equal
// !==	not equal value or not equal type
// >	greater than
// <	less than
// >=	greater than or equal to
// <=	less than or equal to
// ?	ternary operator

let x = 10;
let y = 15;

console.log(` x < y (${x < y}) `);

console.log(` x > y (${x > y}) `);

console.log(` x == y (${x == y}) `);

/**
|--------------------------------------------------
| Important Equal Sign in JavaScript
|--------------------------------------------------
*/

let firstNumber = 10;
let secondNumber = '10';

console.log(` firstNumber == secondNumber (${firstNumber == secondNumber})`);

// You Should Always 3 equals
console.log(` firstNumber === secondNumber (${firstNumber === secondNumber})`);

/**
|--------------------------------------------------
| Logical Operator
|--------------------------------------------------
*/

let a = 6,
	b = 3;

// &&	and	(a < 10 && b > 1) is true
console.log(a < 10 && b > 1);

// ||	or	(a == 5 || b == 5) is false
console.log(a == 5 || b == 5);

// !	not	!(a == b) is true
console.log(!(a == b));

/**
|--------------------------------------------------
| Condition Jump
|--------------------------------------------------
| @if @elseif @else
| @switch
*/
