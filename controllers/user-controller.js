const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('../models/user')(sequelize, DataTypes);

class UserController {
	async register(req, res) {
		try {
			res.json('register');
		} catch (e) {
			console.error(e);
		}
	}
}

module.exports = new UserController();
