module.exports = Object.seal({
    MESSAGES: {
      NUMBER_BASE: 'The field must be a number',
      NUMBER_INTEGER: 'The field must be an integer value',
      NUMBER_POSITIVE: 'The field must be an positive value',
      NUMBER_MAX: 'The field value is greater than maximum allowed values',
      STRING_MAX: 'The field length is greater than maximum allowed length',
      OBJECT_AND: 'Missing one or more fields that are required with another field',
      OBJECT_MISSING: 'At least one of the following fields must be provided',
      ANY_ONLY: "The field doesn't match the allowed values",
      ANY_REQUIRED: 'The field is required',
    },
  });
  