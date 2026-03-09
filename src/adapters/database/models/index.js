const User = require('./User.model.js');
const Product = require('./Product.model.js');
const Order = require("./order")
const databaseConnection = require('./connection.database.js');

// Obtenemos la instancia que ya creaste en tu clase de conexión
const sequelize = databaseConnection.getSequelize();

const db = {
  User,
  Product,
  ...Order,
  sequelize, // <--- ESTO es lo que arregla el error de 'authenticate'
  databaseConnection
};

module.exports = db;