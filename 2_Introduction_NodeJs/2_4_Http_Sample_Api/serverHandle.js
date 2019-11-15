const { LoadDataChunk, checkValidJson } = require('./utils/helpers');
const PostController = require('./controller/PostController');

/**
|--------------------------------------------------
| Exports Modules 
|--------------------------------------------------
*/

module.exports = async (req, res) => {
	const { headers, method, url } = req;

	res.writeHead(200, {
		'Content-Type': 'application/json',
		'X-Powered-By': 'Node js'
	});

	let body = await LoadDataChunk(req);
	// Check Valid Json Or Throw Error
	checkValidJson(body, res);

	// Get All Post RoutName '/'
	if (method === 'GET' && url === '/') {
		PostController.GET_ALL_POST(res);
	} else {
		// 404 Not Found
		PostController.NOT_FOUND(res);
	}
};
