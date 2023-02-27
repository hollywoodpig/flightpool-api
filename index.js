require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database');
const router = require('./router');
const errorMiddleware = require('./middleware/error-middleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);
app.use(errorMiddleware);

async function start() {
	try {
		await sequelize.authenticate();
		await sequelize.sync();

		app.listen(process.env.PORT);
	} catch (e) {
		console.error(e);
	}
}

start();
