const fs = require('fs');
var uniqid = require('uniqid');

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

	/**
    |--------------------------------------------------
    | Helper to Change Json
    |--------------------------------------------------
    */
	json: data => {
		return JSON.stringify(data);
	},
	readPostsJson,
	saveNewPost,
	deletePost
};

// Body To Json
function bodyToJson(body, { 'content-type': headers }) {
	let returnData = Buffer.concat(body);
	return headers === 'application/json' ? JSON.parse(returnData) : false;
}

function readPostsJson() {
	const file = fs.createReadStream(`./data/Post.json`);

	return new Promise((resolve, reject) => {
		let chunks = [];
		file
			.on('data', chunk => {
				chunks.push(chunk);
			})
			.on('end', e => {
				const data = JSON.parse(chunks);
				resolve(data);
			});
	});
}

async function saveNewPost(post) {
	const posts = await readPostsJson();
	const newPost = [ ...posts, { id: uniqid(), ...post } ];

	return new Promise((resolve, reject) => {
		fs.writeFile('./data/Post.json', `${JSON.stringify(newPost, null, 4)}`, err => {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve(true);
		});
	});
}

async function deletePost(id) {
	const posts = await readPostsJson();
	const deletedPost = posts.filter(post => post.id !== +id);

	return new Promise((resolve, reject) => {
		fs.writeFile('./data/Post.json', `${JSON.stringify(deletedPost, null, 4)}`, err => {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve(true);
		});
	});
}
