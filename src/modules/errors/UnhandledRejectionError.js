const BaseError = require('./BaseError');

class UnhandledRejectionError extends BaseError {
  constructor(parent) {
    super(parent.message);
    this.name = 'UnhandledRejectionError';
    this.originalName = parent.name;
    this.message = 'Unhandled Promise Rejection';
    this.stack = parent.stack;
  }
}

module.exports = UnhandledRejectionError;
