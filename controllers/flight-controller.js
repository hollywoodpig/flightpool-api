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
					where: { iata: req.query.from },
					model: models.airport,
					as: 'from',
				},
			});

			const flightsBack = await models.flight.findAll({
				include: {
					where: { iata: req.query.to },
					model: models.airport,
					as: 'to',
				},
			});

			return res.json({
				data: {
					flights_to: flightsTo,
					flight_back: flightsBack,
				},
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new FlightController();
