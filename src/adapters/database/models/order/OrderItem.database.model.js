const { Model, DataTypes } = require('sequelize');

const databaseConnection = require('../../../database/models/connection.database'); 

class OrderItemDatabaseModel extends Model {}

OrderItemDatabaseModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    // Accedemos a la propiedad .sequelize de tu objeto exportado
    sequelize: databaseConnection.sequelize,
    modelName: 'OrderItemDatabaseModel',
    tableName: 'order_item',
    // Tu clase connection ya define underscored: true y timestamps
    timestamps: false,
    underscored: true,
  }
);

module.exports = OrderItemDatabaseModel;