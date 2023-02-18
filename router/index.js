const { Router } = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/user-controller');
const AirportController = require('../controllers/airport-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = new Router();

/**
 * Register user
 * Method: POST
 * Data: { first_name, last_name, phone, document_number }
 */
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
	UserController.register
);

/**
 * Login user
 * Method: POST
 * Data: { phone, password }
 */
router.post(
	'/login',
	[
		body('phone').notEmpty().withMessage('Empty phone'),
		body('password').notEmpty().withMessage('Empty password'),
	],
	UserController.login
);

router.get('/user', authMiddleware, UserController.userInfo);

/**
 * Get airports list
 * Method: GET
 * Data: { query }
 */
router.get('/airport', AirportController.index);

module.exports = router;
