/**
|--------------------------------------------------
| JavaScript Array
|--------------------------------------------------
*/

let books = [ 'City of Girls', 'The Silent Patient' ];

// Get 'City of Girls'
console.log(books[0]);

/**
|--------------------------------------------------
| Array Methods
|--------------------------------------------------
*/

// Length Of Array
console.log(books.length);

// Concat Array
console.log(books.join(` ,\n`));

// Add First Array
books = [ 'Mrs. Everything" by Jennifer Weiner', ...books ];
console.log(books);

// Add Latest Of Array
books = [ ...books, 'Once More We Saw Stars' ];
console.log(books);

/**
|--------------------------------------------------
| Two Arrays Concat
|--------------------------------------------------
*/

let arr1 = [ 'Car', 'Aero' ];
let arr2 = [ 'Bicycle', 'Bike' ];

let joinArr = [ ...arr1, 'Some Middle Value', ...arr2 ];
console.log(joinArr);

/**
|--------------------------------------------------
| Array Maping (Loop)
|--------------------------------------------------
*/
console.log('\nMapping Array\n===========');
joinArr.map(data => {
	console.log(data);
});

/**
|--------------------------------------------------
| Array Filter
|--------------------------------------------------
*/
console.log('\nFiltering Array\n===========');
console.log(joinArr.filter(data => data !== 'Car'));
