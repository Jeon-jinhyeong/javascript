const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json');
const dbConfig = config.db[config.env];
const db = {};

const sequelize = new Sequelize(
  dbConfig.database, 
  dbConfig.username, 
  dbConfig.password, 
  dbConfig,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

module.exports = db;
