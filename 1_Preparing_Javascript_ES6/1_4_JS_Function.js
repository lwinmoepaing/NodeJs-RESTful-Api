/**
|--------------------------------------------------
| Function
|--------------------------------------------------
*/
let total = 0;

function add(x, y) {
	return x + y;
}

total = add(1, 2);
console.log(total);

/**
|--------------------------------------------------
| Arrow Function
|--------------------------------------------------
*/

const addArrow = (x, y) => {
	return x + y;
};

total = addArrow(1, 2);
console.log(total);

/**
|--------------------------------------------------
| in SingleLine,  Arrow Function Shorhand
|--------------------------------------------------
*/

const singleArrow = (x, y) => x + y;

total = singleArrow(3, 4);
console.log(total);
