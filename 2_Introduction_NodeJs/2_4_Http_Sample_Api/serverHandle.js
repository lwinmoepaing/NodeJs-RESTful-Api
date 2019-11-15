const { LoadDataChunk, checkValidJson } = require('./utils/helpers');
const Controller = require('./controller/controller');

/**
|--------------------------------------------------
| Exports Modules 
|--------------------------------------------------
*/

module.exports = async (req, res) => {
	const { method, url } = req;

	res.writeHead(200, {
		'Content-Type': 'application/json',
		'X-Powered-By': 'Node js'
	});

	RequestHandler(req, res);
};

/**
|--------------------------------------------------
| Request Handler
|--------------------------------------------------
*/

async function RequestHandler(req, res) {
	const { headers, method, url } = req;

	let body = await LoadDataChunk(req);
	// Check Valid Json Or Throw Error
	checkValidJson(body, res);

	// Get All Post RoutName '/'
	if (method === 'GET' && url === '/') {
		Controller.GET_ALL_POST(res);
	} else {
		// 404 Not Found
		Controller.NOT_FOUND(res);
	}
}
