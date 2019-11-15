const { json } = require('../utils/helpers');

module.exports = {
	GET_ALL_POST,
	NOT_FOUND
};

/**
|--------------------------------------------------
| GET all Post
|--------------------------------------------------
*/
function GET_ALL_POST(res) {
	res.end(
		json({
			success: true,
			page: '/'
		})
	);
}

/**
|--------------------------------------------------
| Not Found
|--------------------------------------------------
*/
function NOT_FOUND(res) {
	res.writeHead(400, {
		'Content-Type': 'application/json',
		'X-Powered-By': 'Node js'
	});

	res.end(
		json({
			success: false,
			error: {
				message: '404 Not Found'
			}
		})
	);
}
