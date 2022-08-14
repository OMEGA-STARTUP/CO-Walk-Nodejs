const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique:true,
      },
    password: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },    
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  static associate(db) {
   db.User.hasMany(db.Music,{ foreignLey:'bestmusic', sourceKey:'username'});
  }   
};