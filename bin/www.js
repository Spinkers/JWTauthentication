const app = require('../src/app');
const log = require('../src/modules/log');
const config = require('../src/config');
const enums = require('../src/enums');

const port = config.get(enums.CONFIG_KEYS.PORT);
const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
let server = null;

const shutdown = () => {
  log.info('Initiating graceful shutdown...');

  if (server) {
    log.info('Trying to close the HTTP Server...');

    // Force close server after 10secs
    const shutdownTimer = setTimeout(() => {
      log.info('Timed out waiting for server to close, forcing shutdown.');
      process.exit(1); // eslint-disable-line no-process-exit
    }, 10000);

    server.close(() => {
      clearTimeout(shutdownTimer);
      log.info('HTTP server closed successfully');
      log.info('Shutdown complete');
    });
  } else {
    log.info('Shutdown complete');
  }
};

signals.forEach((signal) => {
  process.on(signal, shutdown);
});

app.on('shutdown', shutdown);

app.on('ready', () => {
  server = app.listen(port, () => {
    log.info(`HTTP Server listening on port ${port}`);
  });
});
