const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playlist', {
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
     // autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'background_sound',
        key: 'sound_id'
      }
    },
    order_numb: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'playlist',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "playlist_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "sound_id" },
        ]
      },
    ]
  });
};
