const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification_read', {
    user_id: {
     // autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    notification_id: {
   //   autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'notification',
        key: 'notification_id'
      }
    }
  }, {
    sequelize,
    tableName: 'notification_read',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "notification_read_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "notification_id" },
        ]
      },
    ]
  });
};
