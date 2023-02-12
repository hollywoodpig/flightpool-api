require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const router = require('./routes/api');
const initModels = require('./models/init-models');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

async function start() {
	try {
		await sequelize.authenticate();

		initModels(sequelize);

		app.listen(process.env.PORT);
	} catch (e) {
		console.error(e);
	}
}

start();
