
const { StatusCodeError, StatusCodeTypeError } = require('./errors');
const statusClassSequence = require('./helpers/sequence');
const isNumber = require('isnumber');


const CONSTANTS = {
	INFORMATIONAL: 1,
	SUCCESS: 2,
	REDIRECTION: 3,
	CLIENT_ERROR: 4,
	SERVER_ERROR: 5
};

const validStatusCodes = Object.keys(CONSTANTS)
  .map(c => [...statusClassSequence(CONSTANTS[c])])
  .reduce((pr, cr) => pr.concat(cr), []);


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

function matcher (code) {

  let statusCode = Number(code);

  if (!isNumber(statusCode) || statusCode === 0) throw new StatusCodeTypeError(code);

	const statusClass = Math.floor(statusCode / 100);

  if (!validStatusCodes.includes(statusCode)) throw new StatusCodeError(code);

	return statusClass;
}


module.exports = Object.assign(CONSTANTS, helpers, { match: matcher });
