const User = require('./User.model');
const Product = require('./Product.model');
const databaseConnection = require('./connection.js'); // Ajusta la ruta si es necesario

// Obtenemos la instancia que ya creaste en tu clase de conexión
const sequelize = databaseConnection.getSequelize();

const db = {
  User,
  Product,
  sequelize, // <--- ESTO es lo que arregla el error de 'authenticate'
  databaseConnection
};

module.exports = db;