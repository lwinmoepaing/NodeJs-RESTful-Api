const fs = require('fs');
var uniqid = require('uniqid');

module.exports = {
	checkValidJson,
	LoadDataChunk,
	// Helper Json
	json,
	// For Models
	readPostsJson,
	saveNewPost,
	updatePost,
	deletePost,
	// Formats
	postFormat,
	postByIdFormat
};

/**
|--------------------------------------------------
| Helpers 
|--------------------------------------------------
*/

function LoadDataChunk(req) {
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
}

function checkValidJson(json, res) {
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
}

function json(data) {
	return JSON.stringify(data);
}

// Body To Json
function bodyToJson(body, { 'content-type': headers }) {
	let returnData = Buffer.concat(body);
	return headers === 'application/json' ? JSON.parse(returnData) : false;
}

/**
|--------------------------------------------------
| Models 
|--------------------------------------------------
*/

function readPostsJson() {
	const file = fs.createReadStream(`./data/Post.json`);

	return new Promise((resolve, reject) => {
		let chunks = [];
		file
			.on('data', chunk => {
				chunks.push(chunk);
			})
			.on('end', e => {
				const posts = JSON.parse(chunks);
				resolve(posts);
			});
	});
}

async function saveNewPost(acceptPost) {
	const readedPost = await readPostsJson();
	const newPost = { id: uniqid(), ...acceptPost };
	const savePost = [ ...readedPost, newPost ];

	return new Promise((resolve, reject) => {
		fs.writeFile('./data/Post.json', `${JSON.stringify(savePost, null, 4)}`, err => {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve(newPost);
		});
	});
}

async function updatePost(id, res, dataFromUser) {
	const posts = await readPostsJson();

	const getPost = posts.find(post => post.id === id);
	if (!getPost) return false;

	const { title, body, writer } = dataFromUser;
	return Promise.resolve(
		res.end(
			json({
				success: false
			})
		)
	);
}

async function deletePost(id) {
	const posts = await readPostsJson();
	const deletedPost = posts.filter(post => post.id !== id);

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

/**
|--------------------------------------------------
| Format
|--------------------------------------------------
*/

function postFormat(post) {
	return {
		...post,
		next: {
			url: `/posts/${post.id}`,
			method: 'GET',
			description: 'Get More Information'
		}
	};
}

function postByIdFormat(posts, id) {
	const [ post ] = posts.filter(post => post.id === id);
	return !post
		? []
		: [
				{
					...post,
					next: {
						url: '/posts',
						method: 'GET',
						description: 'Get All Posts'
					}
				}
			];
}
