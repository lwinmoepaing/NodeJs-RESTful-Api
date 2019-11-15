const { LoadDataChunk, checkValidJson, json } = require('./utils/helpers');
const PostController = require('./controller/PostController');
const { pathToRegexp, match, parse, compile } = require('path-to-regexp');

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
	if (method === 'GET' && url === '/') {
		PostController.SHOW_OPTIONS(res);
	} else if (method === 'GET' && url === '/posts') {
		PostController.GET_ALL_POST(res);
	} else if (method === 'GET' && isMatch('/posts/:id', url)) {
		const { params } = isMatch('/posts/:id', url);
		PostController.GET_POST_BY_ID(res, params.id);
	} else if (method === 'POST' && '/posts') {
		checkValidJson(body, res);
		PostController.CREATE_POST(res, body);
	} else if (method === 'DELETE' && isMatch('/posts/:id', url)) {
		const { params } = isMatch('/posts/:id', url);
		PostController.DELETE_POST_BY_ID(res, params.id);
	} else {
		// 404 Not Found
		PostController.NOT_FOUND(res);
	}
};

function isMatch(path, url) {
	return match(path, { decode: decodeURIComponent })(url);
}
