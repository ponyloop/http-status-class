
class StatusCodeError extends Error {
  constructor(code) {
    super(code);

    this.message = `Code ${code} is not a valid HTTP status code`;
  }
}

class StatusCodeTypeError extends Error {
  constructor(code) {
    super(code);
  
    this.message = `Status code must be a number, got ${typeof code}`;
  }
}

module.exports = { StatusCodeError, StatusCodeTypeError };
