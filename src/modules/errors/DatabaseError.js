const { Sequelize } = require('../database');
const BaseError = require('./BaseError');

class DatabaseError extends BaseError {
  constructor(parent) {
    super(parent.message);
    this.name = 'DatabaseError';
    this.originalName = parent.name;
    if (parent instanceof Sequelize.ConnectionError) {
      this.isOperational = true;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = DatabaseError;
