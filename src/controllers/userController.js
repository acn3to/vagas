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

const updateUser = (req, res) => {
	const id = req.query.id;
	const { name, job } = req.body;

	const user = data.find((user) => user.id === id);

	if (user) {
		if (name) {
			user.name = name;
		}

		if (job) {
			user.job = job;
		}

		res.send(user);
	} else {
		res.status(404).send('Usuário não encontrado');
	}
};

const deleteUser = (req, res) => {
	const name = req.query.name;

	const userIndex = data.findIndex((user) => user.name === name);

	if (userIndex !== -1) {
		data.splice(userIndex, 1);
		res.send('Usuário removido com sucesso');
	} else {
		res.status(404).send('Usuário não encontrado');
	}
};

module.exports = {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
};
