const validation = require('../helpers/validation');
const UserService = require('../services/user-service');
const ApiError = require('../exceptions/api-error');

class UserController {
	/**
	 * Register
	 */
	async register(req, res, next) {
		try {
			const validationErrors = validation(req);

			if (!validationErrors.isEmpty()) {
				throw ApiError.Unvalidated(validationErrors.mapped());
			}

			const user = await UserService.register(req.body);

			return res.json(user);
		} catch (e) {
			next(e);
		}
	}

	/**
	 * Login
	 */
	async login(req, res, next) {
		try {
			const validationErrors = validation(req);

			if (!validationErrors.isEmpty()) {
				throw ApiError.Unvalidated(validationErrors.mapped());
			}

			const candidate = await UserService.login(req.body);

			return res.json({
				data: {
					token: candidate.api_token,
				},
			});
		} catch (e) {
			next(e);
		}
	}

	/**
	 * User info
	 */
	async userInfo(req, res) {
		return res.json({
			user: req.user,
		});
	}
}

module.exports = new UserController();
