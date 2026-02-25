const { DataTypes } = require('sequelize');
const databaseConnection = require('../connection');

const sequelize = databaseConnection.getSequelize();

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'User unique identifier'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name cannot be empty'
      },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters'
      }
    },
    comment: 'User full name'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: 'Email already exists'
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address'
      }
    },
    comment: 'User email address'
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: 'Age must be positive'
      },
      max: {
        args: [150],
        msg: 'Age must be realistic'
      }
    },
    comment: 'User age'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
    comment: 'User active status'
  }
}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['is_active']
    }
  ]
});

module.exports = User;