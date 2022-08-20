const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
     // autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    identifier: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "identifierunique"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: true,
      unique: "emailunique"
    },
    nickname: {
      type: DataTypes.STRING(40),
      allowNull: true,
      unique: "nicknameunique"
    },
    profile_img_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sound_background_img_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "emailunique",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "identifierunique",
        unique: true,
        fields: [
          { name: "identifier" },
        ]
      },
      {
        name: "nicknameunique",
        unique: true,
        fields: [
          { name: "nickname" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
