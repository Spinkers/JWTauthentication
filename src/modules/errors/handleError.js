const log = require('../log');
const format = require('./format');
const ValidationError = require('./ValidationError');

/**
 * Process the error object and generate a log entry if isn't a instance of ValidationError.
 * the return is an object containing an array of the error details
 * Use this handler to add other actions if necessary, like notifying an admin etc.
 */
const handleError = (err) => {
  if (!(err instanceof ValidationError)) {
    log.error(err);
    return null;
  }

  return format(err);
};

module.exports = handleError;
