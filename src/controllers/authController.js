const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const data = require('../data/fakeData');

const login = (req, res) => {
	const { name, password } = req.body;
	const user = data.find((user) => user.name === name);
	const secret = process.env.JWT_SECRET;

	if (user) {
		const passwordMatch = bcrypt.compareSync(password, user.password);

		if (passwordMatch) {
			const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
			return res.json({ token });
		} else {
			return res.status(401).json({ message: 'Credenciais inválidas' });
		}
	} else {
		return res.status(404).json({ message: 'Usuário não encontrado' });
	}
};

module.exports = {
	login,
};
