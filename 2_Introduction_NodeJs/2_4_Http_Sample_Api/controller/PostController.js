const {
	json,
	readPostsJson,
	saveNewPost,
	deletePost,
	postFormat,
	postByIdFormat,
	updatePost
} = require('../utils/helpers');

/**
|--------------------------------------------------
| Export Modules 
|--------------------------------------------------
*/

module.exports = {
	SHOW_OPTIONS,
	GET_ALL_POST,
	GET_POST_BY_ID,
	CREATE_POST,
	UPDATE_POST_BY_ID,
	DELETE_POST_BY_ID,
	NOT_FOUND
};

/**
|--------------------------------------------------
| Show Options
|--------------------------------------------------
*/

function SHOW_OPTIONS(res) {
	res.end(
		json({
			success: true
		})
	);
}

/**
|--------------------------------------------------
| GET all Post
|--------------------------------------------------
*/

async function GET_ALL_POST(res) {
	const posts = await readPostsJson();

	res.end(
		json({
			success: true,
			data: posts.map(postFormat)
		})
	);
}

/**
|--------------------------------------------------
| GET Post By Id
|--------------------------------------------------
*/

async function GET_POST_BY_ID(res, id) {
	const posts = await readPostsJson();
	res.end(
		json({
			success: true,
			data: postByIdFormat(posts, id)
		})
	);
}

/**
|--------------------------------------------------
| Create New Post
|--------------------------------------------------
*/

async function CREATE_POST(res, reqBody) {
	const { title, body, writer } = reqBody;
	const savePost = await saveNewPost({
		title,
		body,
		writer
	});
	if (savePost) {
		res.end(
			json({
				success: true,
				message: 'Successfully Create New Post',
				data: [ savePost ]
			})
		);
	}
}

/**
|--------------------------------------------------
| Update Post By Id
|--------------------------------------------------
*/
async function UPDATE_POST_BY_ID(reqBody, res, id) {
	const { title, body, writer } = reqBody;
	const dataFromUser = {
		title,
		body,
		writer
	};
	const updated = await updatePost(id, res, dataFromUser);

	if (updated) {
		res.end(
			json({
				success: true,
				message: 'Successfully Updated'
			})
		);
	} else {
		res.writeHead(401, {
			'Content-Type': 'application/json',
			'X-Powered-By': 'Node js'
		});

		res.end(
			json({
				success: false,
				error: {
					message: 'Cant Updated'
				}
			})
		);
	}
}

/**
|--------------------------------------------------
| DELETE POST BY ID
|--------------------------------------------------
*/

async function DELETE_POST_BY_ID(res, id) {
	const posts = await deletePost(id);
	res.end(
		json({
			success: true
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
