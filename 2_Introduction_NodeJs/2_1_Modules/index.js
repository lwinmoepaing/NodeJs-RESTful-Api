/**
|--------------------------------------------------
| Node Core Modules
|--------------------------------------------------
|
| @http 	    => http module includes classes, methods and events to create Node.js http server.
| @url  	    => url module includes methods for URL resolution and parsing.
| @querystring	=> querystring module includes methods to deal with query string.
| @path	        => path module includes methods to deal with file paths.
| @fs	        => fs module includes classes, methods, and events to work with file I/O.
| @util	        => util module includes utility functions useful for programmers.
|
*/

// FS

const fs = require('fs');

fs.readFile('sample.txt', (err, data) => {
	if (err) throw new Error(err);

	console.log(data.toString());
});
