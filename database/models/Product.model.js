const { DataTypes } = require('sequelize');
const databaseConnection = require('../connection');

const sequelize = databaseConnection.getSequelize();

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  category: {
    type: DataTypes.ENUM('electronics', 'clothing', 'food', 'books', 'other'),
    defaultValue: 'other'
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_available'
  }
}, {
  tableName: 'products',
  timestamps: true,
  indexes: [
    {
      fields: ['category']
    },
    {
      fields: ['is_available']
    }
  ]
});

module.exports = Product;