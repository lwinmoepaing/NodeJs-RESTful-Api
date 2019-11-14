const fs = require('fs');

module.exports = callback => {
	fs.readFile('test.txt', (err, data) => {
		// done Data
		console.log('Reading Done!');
		if (callback) {
			callback(data.toString());
		}
	});
};
