const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attendance', {
    user_id: {
      //autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    attend_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'attendance',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "attendance_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "attend_date" },
        ]
      },
    ]
  });
};
