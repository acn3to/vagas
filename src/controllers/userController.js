const data = require('../data/fakeData');
const { v4: uuidv4 } = require('uuid');

const getUser = (req, res) => {
	const name = req.query.name;

	const user = data.find((user) => user.name === name);

	if (user) {
		res.send(user);
	} else {
		res.status(404).send('Usuário não encontrado');
	}
};

const getUsers = (req, res) => {
	res.send(data);
};

const createUser = (req, res) => {
	const { name, job } = req.body;
	const id = uuidv4();

	const newUser = {
		id,
		name,
		job,
	};

	data.push(newUser);

	res.status(201).send(newUser);
};

module.exports = {
	getUser,
	getUsers,
	createUser,
};
