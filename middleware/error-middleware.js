const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
	if (err instanceof ApiError) {
		return res.status(err.code).json({
			code: err.code,
			message: err.message,
			errors: err.errors,
		});
	}

	return res.status(500).json({
		message: 'No no no no no! This is not how it was supposed to go!',
	});
};
