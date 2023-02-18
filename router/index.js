const { Router } = require('express');
const { body, query } = require('express-validator');
const UserController = require('../controllers/user-controller');
const AirportController = require('../controllers/airport-controller');
const FlightController = require('../controllers/flight-controller');
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
 * Query params: { query }
 */
router.get('/airports', AirportController.index);

/**
 * Get flights list
 * Method: GET
 * Query params: { from, to, date1, date2, passengers }
 */
router.get(
	'/flights',
	[
		query('from')
			.notEmpty()
			.withMessage('Empty IATA code')
			.matches(/^[A-Z]{3}$/)
			.withMessage('Incorrect IATA code'),
		query('to')
			.notEmpty()
			.withMessage('Empty IATA code')
			.matches(/^[A-Z]{3}$/)
			.withMessage('Incorrect IATA code'),
		query('date1')
			.notEmpty()
			.withMessage('Empty date')
			.matches(/\d{4}-\d{2}-\d{2}/)
			.withMessage('Incorrect date format, use YYYY-DD-DD'),
		query('date2')
			.optional()
			.matches(/\d{4}-\d{2}-\d{2}/)
			.withMessage('Incorrect date format, use YYYY-DD-DD'),
		query('passengers')
			.notEmpty()
			.withMessage('A flight without any passengers? Seriously?')
			.matches(/^[1-8]$/)
			.withMessage('Enter number from 1 to 8'),
	],
	FlightController.index
);

module.exports = router;
