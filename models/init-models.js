const { DataTypes } = require('sequelize');

const _user = require('./user');

function initModels(sequelize) {
	const user = _user(sequelize, DataTypes);

	return {
		user,
	};
}

module.exports = initModels;
