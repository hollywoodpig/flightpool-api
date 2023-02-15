const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('../database');

class UserService {
	async register(first_name, last_name, phone, document_number, password) {
		const candidate = await models.user.findOne({
			where: { phone },
		});

		if (candidate) {
			const error = new Error('User already exists');

			error.code = 409;

			throw error;
		}

		const hashPassword = await bcrypt.hash(password, 7);
		const token = jwt.sign(
			{ first_name, last_name, phone, document_number },
			process.env.SECRET_KEY
		);

		const user = await models.user.create({
			first_name,
			last_name,
			phone,
			document_number,
			api_token: token,
			password: hashPassword,
		});

		return user;
	}

	async login(phone, password) {
		const candidate = await models.user.findOne({
			where: { phone },
		});

		if (!candidate) {
			const error = new Error('Unathorized');

			error.code = 401;
			error.errors = {
				phone: ['Phone or password incorrect'],
			};

			throw error;
		}

		const validPassword = bcrypt.compareSync(password, candidate.password);

		if (!validPassword) {
			const error = new Error('Unathorized');

			error.code = 401;
			error.errors = {
				phone: ['Phone or password incorrect'],
			};

			throw error;
		}

		return candidate;
	}
}

module.exports = new UserService();
