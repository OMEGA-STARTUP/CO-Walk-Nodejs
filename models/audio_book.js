const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audio_book', {
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
    audio_book_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'audio_book',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "audio_book_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "audio_book_title" },
        ]
      },
    ]
  });
};
