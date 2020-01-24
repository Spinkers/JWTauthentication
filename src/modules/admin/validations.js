const Joi = require('@hapi/joi');
const { errorMessages } = require('../validation/i18n');

module.exports = {
  login: Joi.object({
    username: Joi.string()
      .required()
      .messages({
        'any.required': errorMessages.MESSAGES.ANY_REQUIRED,
      }),

    password: Joi.string()
      .required()
      .messages({
        'any.required': errorMessages.MESSAGES.ANY_REQUIRED,
      }),
  }),
};
