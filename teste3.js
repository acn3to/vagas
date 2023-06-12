const data = require('./src/data/fakeData.js');

module.exports = function (req, res) {
	const name = req.query.name;

	for (let i = 0; i < data.length; i++) {
		if (data[i].name === name) {
			data.splice(i, 1);
			res.send('Usuário removido com sucesso');
			return;
		}
	}

	res.send('Usuário não encontrado');
};
