const Sequelize = require('sequelize');
const Music = require('./music');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];



const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.Music =  Music;
Music.init(sequelize);
Music.associate(db);

module.exports = db;