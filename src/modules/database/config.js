const config = require('../../config');
const enums = require('../../enums');

const DBConfig = config.get(enums.CONFIG_KEYS.DB.ALL);

module.exports = {
  ...DBConfig,
  define: {
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    freezeTableName: true,
    charset: 'uf8mb4',
    dialectOptions: {
      collate: 'uf8mb4_general_ci',
    },
  },
  logging: config.get(enums.CONFIG_KEYS.ENV) !== enums.ENVS.PRODUCTION ? console.log : false,
};
