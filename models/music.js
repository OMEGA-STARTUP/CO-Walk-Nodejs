const Sequelize = require('sequelize');

module.exports = class Music extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
   
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Music',
      tableName: 'musics',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    
  }
};