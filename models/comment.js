const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    decorate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pwd: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comment',
    schema: 'public',
    timestamps: false
  });
};
