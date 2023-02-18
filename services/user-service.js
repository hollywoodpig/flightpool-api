const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('../database');
const ApiError = require('../exceptions/api-error');

class UserService {
	/**
	 * Register
	 */
	async register({
		first_name,
		last_name,
		phone,
		document_number,
		password,
	}) {
		const candidate = await models.user.findOne({
			where: { phone },
		});

		if (candidate) {
			throw ApiError.BadRequest('User already exists');
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

	/**
	 * Login
	 */
	async login({ phone, password }) {
		const candidate = await models.user.findOne({
			where: { phone },
		});

		if (!candidate) {
			throw ApiError.Unathorized();
		}

		const validPassword = bcrypt.compareSync(password, candidate.password);

		if (!validPassword) {
			throw ApiError.Unathorized();
		}

		return candidate;
	}
}

module.exports = new UserService();
