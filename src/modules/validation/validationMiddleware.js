const enums = require('./enums');
const { ValidationError } = require('../errors');

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    let value;
    switch (property) {
      case enums.REQUEST_PROPERTY.QUERY:
        value = req.query;
        break;
      case enums.REQUEST_PROPERTY.BODY:
        value = req.body;
        break;
      case enums.REQUEST_PROPERTY.PARAMS:
        value = req.params;
        break;
      default:
        throw new Error('invalid validation field');
    }

    const result = schema.validate(value);
    const { error } = result;

    if (error) {
      const validationError = new ValidationError(error);
      return next(validationError);
    }
    return next();
  };
};
module.exports = validationMiddleware;
