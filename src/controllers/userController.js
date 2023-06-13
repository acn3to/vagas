const bcrypt = require('bcrypt');
const data = require('../data/fakeData');
const { v4: uuidv4 } = require('uuid');

const initializeReadCount = () => {
	data.forEach((user) => {
		if (user.readCount === undefined) {
			user.readCount = 0;
		}
	});
};

const sanitizeUser = (user) => {
	const { password, ...sanitizedUser } = user;
	return sanitizedUser;
};

const getUser = (req, res) => {
	const name = req.query.name;
	const user = data.find((user) => user.name === name);

	initializeReadCount();

	if (user) {
		user.readCount++;
		const sanitizedUser = sanitizeUser(user);
		res.send(sanitizedUser);
	} else {
		return res.status(404).json({ message: 'Usuário não encontrado' });
	}
};

const getUsers = (req, res) => {
	const sanitizedUsers = data.map((user) => sanitizeUser(user));
	res.json(sanitizedUsers);
};

const createUser = (req, res) => {
	const { name, job, password, isAdm } = req.body;
	const id = uuidv4();

	const hashedPassword = bcrypt.hashSync(password, 10);

	const newUser = {
		id,
		name,
		job,
		password: hashedPassword,
		isAdm,
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

const getUserReadCount = (req, res) => {
	const name = req.query.name;
	const user = data.find((user) => user.name === name);

	if (!user) {
		res.send('Usuário não encontrado');
		return;
	}

	if (user.readCount === undefined) {
		res.send(`O usuário ${name} ainda não foi lido.`);
	} else {
		res.send(`O usuário ${name} foi lido ${user.readCount} vez(es).`);
	}
};

module.exports = {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getUserReadCount,
};
