var DataTypes = require("sequelize").DataTypes;
var _attendance = require("./attendance");
var _audio_book = require("./audio_book");
var _audio_sound_playlist = require("./audio_sound_playlist");
var _background_sound = require("./background_sound");
var _favorite = require("./favorite");
var _notification = require("./notification");
var _notification_read = require("./notification_read");
var _playlist = require("./playlist");
var _sound_history = require("./sound_history");
var _users = require("./users");

function initModels(sequelize) {
  var attendance = _attendance(sequelize, DataTypes);
  var audio_book = _audio_book(sequelize, DataTypes);
  var audio_sound_playlist = _audio_sound_playlist(sequelize, DataTypes);
  var background_sound = _background_sound(sequelize, DataTypes);
  var favorite = _favorite(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var notification_read = _notification_read(sequelize, DataTypes);
  var playlist = _playlist(sequelize, DataTypes);
  var sound_history = _sound_history(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  background_sound.belongsToMany(users, { as: 'user_id_users', through: favorite, foreignKey: "sound_id", otherKey: "user_id" });
  background_sound.belongsToMany(users, { as: 'user_id_users_playlists', through: playlist, foreignKey: "sound_id", otherKey: "user_id" });
  background_sound.belongsToMany(users, { as: 'user_id_users_sound_histories', through: sound_history, foreignKey: "sound_id", otherKey: "user_id" });
  notification.belongsToMany(users, { as: 'user_id_users_notification_reads', through: notification_read, foreignKey: "notification_id", otherKey: "user_id" });
  users.belongsToMany(background_sound, { as: 'sound_id_background_sounds', through: favorite, foreignKey: "user_id", otherKey: "sound_id" });
  users.belongsToMany(background_sound, { as: 'sound_id_background_sound_playlists', through: playlist, foreignKey: "user_id", otherKey: "sound_id" });
  users.belongsToMany(background_sound, { as: 'sound_id_background_sound_sound_histories', through: sound_history, foreignKey: "user_id", otherKey: "sound_id" });
  users.belongsToMany(notification, { as: 'notification_id_notifications', through: notification_read, foreignKey: "user_id", otherKey: "notification_id" });
  audio_sound_playlist.belongsTo(audio_book, { as: "audio_book_title_audio_book", foreignKey: "audio_book_title"});
  audio_book.hasMany(audio_sound_playlist, { as: "audio_sound_playlists", foreignKey: "audio_book_title"});
  audio_sound_playlist.belongsTo(audio_book, { as: "user", foreignKey: "user_id"});
  audio_book.hasMany(audio_sound_playlist, { as: "user_audio_sound_playlists", foreignKey: "user_id"});
  audio_sound_playlist.belongsTo(background_sound, { as: "sound", foreignKey: "sound_id"});
  background_sound.hasMany(audio_sound_playlist, { as: "audio_sound_playlists", foreignKey: "sound_id"});
  favorite.belongsTo(background_sound, { as: "sound", foreignKey: "sound_id"});
  background_sound.hasMany(favorite, { as: "favorites", foreignKey: "sound_id"});
  playlist.belongsTo(background_sound, { as: "sound", foreignKey: "sound_id"});
  background_sound.hasMany(playlist, { as: "playlists", foreignKey: "sound_id"});
  sound_history.belongsTo(background_sound, { as: "sound", foreignKey: "sound_id"});
  background_sound.hasMany(sound_history, { as: "sound_histories", foreignKey: "sound_id"});
  notification_read.belongsTo(notification, { as: "notification", foreignKey: "notification_id"});
  notification.hasMany(notification_read, { as: "notification_reads", foreignKey: "notification_id"});
  attendance.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(attendance, { as: "attendances", foreignKey: "user_id"});
  audio_book.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(audio_book, { as: "audio_books", foreignKey: "user_id"});
  favorite.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(favorite, { as: "favorites", foreignKey: "user_id"});
  notification_read.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(notification_read, { as: "notification_reads", foreignKey: "user_id"});
  playlist.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(playlist, { as: "playlists", foreignKey: "user_id"});
  sound_history.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(sound_history, { as: "sound_histories", foreignKey: "user_id"});

  return {
    attendance,
    audio_book,
    audio_sound_playlist,
    background_sound,
    favorite,
    notification,
    notification_read,
    playlist,
    sound_history,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
