const isOperationalError = (err) => {
    if (err.isOperational) {
      return true;
    }
    return false;
  };
  
  module.exports = isOperationalError;
  