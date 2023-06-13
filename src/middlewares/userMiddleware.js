const { doesUsernameExist } = require('../services/userService');

const validateUser = (req, res, next) => {
	const { name, job, password } = req.body;

	if (!name || !job || !password) {
		return res.status(400).json({ message: 'Dados incompletos do usuário' });
	}

	if (name.length < 3) {
		return res.status(400).json({ message: 'Nome do usuário inválido' });
	}

	const nameExists = doesUsernameExist(name);
	if (nameExists) {
		return res.status(400).json({ message: 'Nome de usuário já existe' });
	}

	next();
};

module.exports = { validateUser };
