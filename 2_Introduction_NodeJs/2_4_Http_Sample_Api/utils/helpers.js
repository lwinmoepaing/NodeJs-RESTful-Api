/**
|--------------------------------------------------
| Helper to Change Json
|--------------------------------------------------
*/

module.exports = {
	checkValidJson: (json, res) => {
		if (!json) {
			res.writeHead(400, {
				'Content-Type': 'application/json',
				'X-Powered-By': 'Node js'
			});
			res.end(
				JSON.stringify({
					success: false,
					error: {
						message: 'Not Json Format'
					}
				})
			);
		}
	},

	LoadDataChunk: req => {
		let { headers } = req;
		let body = [];
		return new Promise((resolve, reject) => {
			req
				// On Load Data As Chunk
				.on('data', chunk => {
					body.push(chunk);
				})
				// On Loaded Data is Done
				.on('end', () => {
					body = bodyToJson(body, headers);
					resolve(body);
				});
		});
	},
	json: data => {
		return JSON.stringify(data);
	}
};

// Body To Json
function bodyToJson(body, { 'content-type': headers }) {
	let returnData = Buffer.concat(body);
	return headers === 'application/json' ? JSON.parse(returnData) : false;
}
