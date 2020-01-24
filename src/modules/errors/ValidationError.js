const BaseError = require('./BaseError');
const enums = require('../../enums');

class ValidationError extends BaseError {
  constructor(joiError) {
    super(joiError.message);

    this.name = 'ValidationError';
    this.statusCode = enums.HTTP_STATUS.BAD_REQUEST;
    this.isOperational = true;

    this.details = joiError.details.map((detail) => {
      const responseDetail = {
        message: detail.message,
        keys: [],
        type: detail.type,
      };
      if (detail.context.key) {
        responseDetail.keys.push(detail.context.key);
      } else {
        responseDetail.keys = detail.context.missingWithLabels || detail.context.peersWithLabels;
      }
      return responseDetail;
    });
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ValidationError;
