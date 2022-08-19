var DataTypes = require("sequelize").DataTypes;
var _comment = require("./comment");

function initModels(sequelize) {
  var comment = _comment(sequelize, DataTypes);


  return {
    comment,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
