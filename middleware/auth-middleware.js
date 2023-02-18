const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');

module.exports = function (req, res, next) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return next(ApiError.Unathorized());
		}

		const token = authHeader.replace('Bearer ', '');

		if (!token) {
			return next(ApiError.Unathorized());
		}

		const data = jwt.verify(token, process.env.SECRET_KEY);

		if (!data) {
			return next(ApiError.Unathorized());
		}

		req.user = data;

		next();
	} catch (e) {
		return next(ApiError.Unathorized());
	}
};
