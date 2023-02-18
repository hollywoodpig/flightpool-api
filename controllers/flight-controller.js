const { Op } = require('sequelize');
const { models } = require('../database');
const validation = require('../helpers/validation');
const ApiError = require('../exceptions/api-error');

class FlightController {
	async index(req, res, next) {
		try {
			const validationErrors = validation(req);

			if (!validationErrors.isEmpty()) {
				throw ApiError.Unvalidated(validationErrors.mapped());
			}

			const flightsTo = await models.flight.findAll({
				include: {
					model: models.airport,
					as: 'from',
					where: { iata: req.query.from },
				},
			});

			return res.json({
				data: {
					flightsTo,
				},
			});

			// return flights with from_id equals id from airport with query.from
		} catch (e) {
			console.log(e);
			next(e);
		}
	}
}

module.exports = new FlightController();
