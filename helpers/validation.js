const { validationResult } = require('express-validator');

const validation = validationResult.withDefaults({
	formatter: (error) => error.msg,
});

module.exports = validation;
