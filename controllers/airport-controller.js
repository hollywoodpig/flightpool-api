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

			return res.json({
				data: airports,
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new AirportController();
