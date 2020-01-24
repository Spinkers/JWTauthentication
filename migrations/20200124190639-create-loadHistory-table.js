module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('load_history', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'file_name',
      },
      status: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
      },
      loadType: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        field: 'load_type',
      },
      lastProcessedLine: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'last_processed_line',
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'started_at',
      },
      endedAt: {
        type: Sequelize.DATE,
        field: 'ended_at',
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('load_history');
  },
};
