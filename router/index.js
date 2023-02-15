const { Router } = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user-controller');

const router = new Router();

router.post(
	'/register',
	[
		body('first_name').notEmpty().withMessage('Empty first name'),
		body('last_name').notEmpty().withMessage('Empty last name'),
		body('phone').notEmpty().withMessage('Empty phone'),
		body('document_number')
			.notEmpty()
			.withMessage('Empty document number')
			.isLength(10)
			.withMessage('Must be 10 characters long'),
		body('password').notEmpty().withMessage('Empty password'),
	],
	userController.register
);

router.post(
	'/login',
	[
		body('phone').notEmpty().withMessage('Empty phone'),
		body('password').notEmpty().withMessage('Empty password'),
	],
	userController.login
);

module.exports = router;
