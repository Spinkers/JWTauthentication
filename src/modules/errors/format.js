const validationError = require('./ValidationError');

const format = (err) => {
  if (err instanceof validationError) {
    return {
      errors: err.details.map((detail) => detail),
    };
  }
  return err;
};

module.exports = format;
