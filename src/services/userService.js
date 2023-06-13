const data = require('../data/fakeData');

const doesUsernameExist = (name) => {
	const existingUser = data.find((user) => user.name === name);
	return !!existingUser;
};

const getUserById = (userId) => {
	return data.find((user) => user.id === userId);
};

module.exports = {
	doesUsernameExist,
	getUserById,
};
