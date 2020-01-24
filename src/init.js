const db = require('./modules/database');
const log = require('./modules/log');

module.exports = async () => {
  try {
    // Testing DB connection
    await db.sequelize.authenticate();
    log.info('Connection to the database has been established successfully.');
  } catch (err) {
    log.error(err, 'Unable to connect to the database: ');
    throw err;
  }
};
