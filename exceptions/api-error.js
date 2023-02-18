class ApiError extends Error {
	code;
	errors;

	constructor(code, message, errors = {}) {
		super(message);

		this.code = code;
		this.errors = errors;
	}

	static Unvalidated(errors = {}) {
		return new ApiError(422, 'Validation error', errors);
	}

	static Unathorized() {
		return new ApiError(401, 'Unathorized');
	}

	static BadRequest(message, errors = {}) {
		return new ApiError(400, message, errors);
	}
}

module.exports = ApiError;
