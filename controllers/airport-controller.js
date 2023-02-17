const { Op } = require('sequelize');
const { models } = require('../database');

class AirportController {
	/**
	 * Get airports list by query
	 */
	async index(req, res) {
		try {
			const { query } = req.query;

			const airports = await models.airport.findAll({
				where: {
					[Op.or]: [
						{
							city: {
								[Op.like]: `%${query}%`,
							},
						},
						{
							name: {
								[Op.like]: `%${query}%`,
							},
						},
						{
							iata: {
								[Op.like]: `%${query}%`,
							},
						},
					],
				},
			});

			res.json({
				data: airports,
			});
		} catch {
			return res.status(502).json({
				code: 502,
				message: 'Error',
				errors: {
					query: "Couldn't get airports",
				},
			});
		}
	}
}

module.exports = new AirportController();
