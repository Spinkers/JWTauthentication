const express = require('express');
const helmet = require('helmet');

const init = require('./init');
const log = require('./modules/log');
const errors = require('./modules/errors');
const docs = require('./modules/docs');

const config = require('../src/config');
const enums = require('../src/enums');

// Unhandled Exception listeners
process.on('unhandledRejection', (reason) => {
  throw new errors.UnhandledRejectionError(reason);
});
process.on('uncaughtException', (err) => {
  let uncaughtError = err;
  if (!(uncaughtError instanceof errors.UnhandledRejectionError)) {
    uncaughtError = new errors.UncaughtExceptionError(err);
  }
  const isOperational = errors.handleError(uncaughtError);
  if (!isOperational) {
    /**
     * If the error is unexpected, the application SHOULD crash immediately without waiting for all requests to finish.
     * These types of errors have the potential to put the application into an unknow state, possibly causing unknow side effects,
     * corrupting data, saving wrong data to the DB and etc.
     */
    log.info('Forcing shutdown because of unexpected error...');
    process.exit(1); // eslint-disable-line no-process-exit
  }
});

const app = express();

// Initialization
init()
  .then(() => {
    app.emit('ready');
  })
  .catch(() => {
    log.info('Shutdown because of initialization error');
    process.exitCode = 1;
  });

app.use(helmet());
app.use(express.json());

// health check
app.get('/', (_, res) => {
  res.sendStatus(200);
});

if (config.get(enums.CONFIG_KEYS.ENV) !== enums.ENVS.PRODUCTION) {
  app.use('/docs', docs.API);
}

// 404 catch all
app.use((_, res) => {
  res.sendStatus(404);
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const formatedErrors = errors.handleError(err);

  const statusCode = err.statusCode ? err.statusCode : enums.HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isOperational = errors.isOperationalError(err);

  if (formatedErrors != null) {
    res.status(statusCode).json(formatedErrors);
  } else {
    res.sendStatus(statusCode);
  }

  if (!isOperational) {
    // If the error is not operational, emit a shutdown event so the server has a chance to start
    // the shutdown process, allowing current requests to finish before exiting.
    app.emit('shutdown');
  }
});

module.exports = app;
