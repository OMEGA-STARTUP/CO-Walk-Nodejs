const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audio_sound_playlist', {
    sound_id: {
      //autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'background_sound',
        key: 'sound_id'
      }
    },
    user_id: {
      //autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'audio_book',
        key: 'user_id'
      }
    },
    audio_book_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'audio_book',
        key: 'user_id'
      }
    },
    order_numb: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'audio_sound_playlist',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "audio_sound_playlist_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "audio_book_title" },
          { name: "sound_id" },
        ]
      },
    ]
  });
};
