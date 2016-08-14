
const CONSTANTS = {
	INFORMATIONAL: 1,
	SUCCESS: 2,
	REDIRECTION: 3,
	CLIENT_ERROR: 4,
	SERVER_ERROR: 5
};


const helpers = {

	isInformational(statusCode) {
		return matcher(statusCode) === CONSTANTS.INFORMATIONAL;
	},

	isSuccess(statusCode) {
		return matcher(statusCode) === CONSTANTS.SUCCESS;
	},

	isRedirection(statusCode) {
		return matcher(statusCode) === CONSTANTS.REDIRECTION;
	},

	isClientError(statusCode) {
		return matcher(statusCode) === CONSTANTS.CLIENT_ERROR;
	},

	isServerError(statusCode) {
		return matcher(statusCode) === CONSTANTS.SERVER_ERROR;
	}
}

function matcher (statusCode) {
	const statusClass = Math.floor(statusCode / 100);
	return statusClass;
}

module.exports = Object.assign(CONSTANTS, helpers, { match: matcher });