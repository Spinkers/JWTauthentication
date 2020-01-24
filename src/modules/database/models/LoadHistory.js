module.exports = (sequelize, DataTypes) => {
  const loadHistory = sequelize.define(
    'loadHistory',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'file_name',
      },
      status: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      loadType: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        field: 'load_type',
      },
      lastProcessedLine: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: 'last_processed_line',
      },
      startedAt: {
        type: DataTypes.DATE,
        field: 'started_at',
      },
      endedAt: {
        type: DataTypes.DATE,
        field: 'ended_at',
      },
    },
    { tableName: 'load_history' },
  );
  return loadHistory;
};
