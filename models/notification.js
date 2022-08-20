const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification', {
    notification_id: {
     // autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notification_pkey",
        unique: true,
        fields: [
          { name: "notification_id" },
        ]
      },
    ]
  });
};
