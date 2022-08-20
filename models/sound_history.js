const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sound_history', {
    listen_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      primaryKey: true
    },
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
    sound_id: {
    //  autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'background_sound',
        key: 'sound_id'
      }
    },
    latest_listen_time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: "CURRENT_TIME"
    },
    actual_play_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sound_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sound_history_pkey",
        unique: true,
        fields: [
          { name: "listen_date" },
          { name: "user_id" },
          { name: "sound_id" },
        ]
      },
    ]
  });
};
