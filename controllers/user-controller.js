const validation = require('../helpers/validation');
const UserService = require('../services/user-service');

class UserController {
	async register(req, res) {
		try {
			const validationErrors = validation(req);

			if (!validationErrors.isEmpty()) {
				const errors = validationErrors.mapped();

				return res.status(422).json({
					code: 422,
					message: 'Validation error',
					errors,
				});
			}

			const { first_name, last_name, phone, document_number, password } =
				req.body;

			await UserService.register(
				first_name,
				last_name,
				phone,
				document_number,
				password
			);

			res.status(204);
		} catch (e) {
			return res.status(e.code).json({
				code: e.code,
				message: e.message,
				errors: e.errors ?? {},
			});
		}
	}

	async login(req, res) {
		try {
			const validationErrors = validation(req);

			if (!validationErrors.isEmpty()) {
				const errors = validationErrors.mapped();

				return res.status(422).json({
					code: 422,
					message: 'Validation error',
					errors,
				});
			}

			const { phone, password } = req.body;

			const candidate = await UserService.login(phone, password);

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
