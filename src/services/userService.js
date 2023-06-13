const data = require('../data/fakeData');

const doesUsernameExist = (name) => {
	const existingUser = data.find((user) => user.name === name);
	return !!existingUser;
};

module.exports = {
	doesUsernameExist,
};
