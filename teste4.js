const data = require('./src/data/fakeData.js');

module.exports = function (req, res) {
	const id = req.query.id;

	const user = data.find((d) => d.id === id);

	if (user) {
		user.name = req.body.name;
		user.job = req.body.job;
		res.send(user);
	} else {
		res.send('Usuário não encontrado');
	}
};
