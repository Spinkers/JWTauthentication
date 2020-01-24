const pino = require('pino');
const config = require('../../config');
const enums = require('../../enums');

const logger = pino({
  prettyPrint:
    config.get(enums.CONFIG_KEYS.ENV) === enums.ENVS.PRODUCTION
      ? false
      : { translateTime: 'SYS:standard' },
});

module.exports = logger;
