const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/userService');

const authenticateToken = (req, res, next) => {
	const authHeader = req.header('Authorization');

	if (!authHeader) {
		return res.status(401).json({ message: 'Token de autenticação não fornecido' });
	}

	if (!authHeader.startsWith('Bearer ')) {
		return res
			.status(401)
			.json({ message: 'Token de autenticação precisa ser do tipo Bearer Token' });
	}

	const token = authHeader.substring(7);

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId;

		const user = getUserById(decoded.userId);

		if (!user) {
			return res.status(403).json({ message: 'Acesso negado' });
		}

		if (req.path === '/users' && req.method === 'PATCH' && !user.isAdm) {
			return res.status(403).json({ message: 'Acesso negado' });
		}

		if (req.path === '/users' && req.method === 'DELETE' && !user.isAdm) {
			return res.status(403).json({ message: 'Acesso negado' });
		}

		next();
	} catch (error) {
		return res.status(403).json({ message: 'Token de autenticação inválido' });
	}
};

module.exports = {
	authenticateToken,
};
