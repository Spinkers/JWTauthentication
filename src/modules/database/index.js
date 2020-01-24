const Sequelize = require('sequelize');
const config = require('./config');

// Models
const User = require('./models/User');
const LoadHistory = require('./models/LoadHistory');

const db = {};

const sequelize = new Sequelize(config);

// Initializing all models
const models = [User, LoadHistory];

models.forEach((model) => {
  const modelInstance = model(sequelize, Sequelize.DataTypes);
  db[modelInstance.name] = modelInstance;
});

// Adding associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
