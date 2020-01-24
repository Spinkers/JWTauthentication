const BaseError = require('./BaseError');
const enums = require('../../enums');

class NotFound extends BaseError {
  constructor() {
    super();

    this.name = 'NotFound';
    this.statusCode = enums.HTTP_STATUS.NOT_FOUND;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = NotFound;
