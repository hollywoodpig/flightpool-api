const { models } = require('../database');

class UserController {
	async register(req, res) {
		try {
			const data = await models.user.findAll();

			res.json(data);
		} catch (e) {
			console.error(e);
		}
	}
}

module.exports = new UserController();
