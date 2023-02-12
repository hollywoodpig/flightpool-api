const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('../database');

const myValidationResult = validationResult.withDefaults({
	formatter: (error) => error.msg,
});

class UserController {
	async register(req, res) {
		try {
			// Валидируем входящие данные
			const validationErrors = myValidationResult(req);

			// Не прошла валидация
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

			// Ищем пользователя в базе данных по номеру телефона
			const candidate = await models.user.findOne({
				where: { phone },
			});

			// Не можем зарегистрировать, т.к. пользователь уже существует
			if (candidate) {
				return res.status(409).json({
					code: 409,
					message: 'User already exists',
				});
			}

			// Хешируем пароль
			const hashPassword = await bcrypt.hash(password, 7);
			// Генерируем токен
			const token = jwt.sign(
				{ first_name, last_name, phone, document_number },
				process.env.SECRET_KEY
			);

			// Регистрируем пользователя
			await models.user.create({
				first_name,
				last_name,
				phone,
				document_number,
				api_token: token,
				password: hashPassword,
			});

			res.status(204);
		} catch (e) {
			console.error(e);
		}
	}

	async login(req, res) {
		try {
			// Валидируем входящие данные
			const validationErrors = myValidationResult(req);

			// Не прошла валидация
			if (!validationErrors.isEmpty()) {
				const errors = validationErrors.mapped();

				return res.status(422).json({
					code: 422,
					message: 'Validation error',
					errors,
				});
			}

			const { phone, password } = req.body;

			// Ищем пользователя в базе данных по номеру телефона
			const candidate = await models.user.findOne({
				where: { phone },
			});

			// Пользователя не существует
			if (!candidate) {
				return res.status(401).json({
					code: 401,
					message: 'Unathorized',
					errors: {
						phone: ['Phone or password incorrect'],
					},
				});
			}

			// Сравниваем пароли
			const validPassword = bcrypt.compareSync(
				password,
				candidate.password
			);

			// Неверный пароль
			if (!validPassword) {
				return res.status(401).json({
					code: 401,
					message: 'Unathorized',
					errors: {
						phone: ['Phone or password incorrect'],
					},
				});
			}

			res.json({
				data: {
					token: candidate.api_token,
				},
			});
		} catch (e) {
			console.error(e);
		}
	}
}

module.exports = new UserController();
