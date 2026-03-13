const User = require('./User.model.js');
const Product = require('./Product.model.js');
const Order = require("./order/index.js")
const databaseConnection = require('./connection.database.js');

const sequelize = databaseConnection.getSequelize();

const db = {
  User,
  Product,
  ...Order,
  sequelize,
  databaseConnection
};

module.exports = db;