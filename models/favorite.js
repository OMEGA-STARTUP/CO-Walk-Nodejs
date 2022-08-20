const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorite', {
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
    }
  }, {
    sequelize,
    tableName: 'favorite',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "favorite_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "sound_id" },
        ]
      },
    ]
  });
};
