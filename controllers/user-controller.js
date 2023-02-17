const validation = require('../helpers/validation');
const UserService = require('../services/user-service');

class UserController {
	/**
	 * Register
	 */
	async register(req, res) {
		try {
			const validationErrors = validation(req);

			if (!validationErrors.isEmpty()) {
				return res.status(422).json({
					code: 422,
					message: 'Validation error',
					errors: validationErrors.mapped(),
				});
			}

			const user = await UserService.register(req.body);

			return res.json(user);
		} catch (e) {
			return res.status(e.code).json({
				code: e.code,
				message: e.message,
				errors: e.errors ?? {},
			});
		}
	}

	/**
	 * Login
	 */
	async login(req, res) {
		try {
			const validationErrors = validation(req);

			if (!validationErrors.isEmpty()) {
				return res.status(422).json({
					code: 422,
					message: 'Validation error',
					errors: validationErrors.mapped(),
				});
			}

			const candidate = await UserService.login(req.body);

			res.json({
				data: {
					token: candidate.api_token,
				},
			});
		} catch (e) {
			return res.status(e.code).json({
				code: e.code,
				message: e.message,
				errors: e.errors ?? {},
			});
		}
	}
}

module.exports = new UserController();
