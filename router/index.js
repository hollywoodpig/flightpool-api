const { Router } = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user-controller');

const router = new Router();

router.post(
	'/register',
	[
		body('first_name')
			.notEmpty()
			.isString()
			.withMessage('Empty first name'),
		body('last_name').notEmpty().isString().withMessage('Empty last name'),
		body('phone').notEmpty().isString().withMessage('Empty phone'),
		body('document_number')
			.notEmpty()
			.isString()
			.withMessage('Empty document number')
			.isLength(10)
			.withMessage('Must be 10 characters long'),
		body('password').notEmpty().isString().withMessage('Empty password'),
	],
	userController.register
);

router.post(
	'/login',
	[
		body('phone').notEmpty().isString().withMessage('Empty phone'),
		body('password').notEmpty().isString().withMessage('Empty password'),
	],
	userController.login
);

module.exports = router;
