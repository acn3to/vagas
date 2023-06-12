const data = require('./src/data/fakeData.js');

module.exports = function (req, res) {
	const name = req.body.name;
	const job = req.body.job;

	const newUser = {
		name,
		job,
	};

	data.push(newUser);

	res.send(newUser);
};
