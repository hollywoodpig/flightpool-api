const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: 'localhost',
		dialect: 'mysql',
		define: {
			charset: 'utf8',
			collate: 'utf8mb4_unicode_ci',
		},
	}
);

module.exports = sequelize;
