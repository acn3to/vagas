const data = require('./src/data/fakeData.js');

module.exports = function (req, res) {
	const name = req.query.name;

	const user = data.find((d) => d.name === name);

	if (user) {
		res.send(`Usuário ${name} foi lido ${user.readCount} vezes.`);
	} else {
		res.send('Usuário não encontrado');
	}
};
