const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('background_sound', {
    sound_id: {
      //autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sound_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    sound_play_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sound_img_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sound_play_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sound_src_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    stepping_sounds: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'background_sound',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "background_sound_pkey",
        unique: true,
        fields: [
          { name: "sound_id" },
        ]
      },
    ]
  });
};
