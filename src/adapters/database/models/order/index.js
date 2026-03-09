const OrderDatabaseModel = require('./Order.database.model');
const OrderItemDatabaseModel = require('./OrderItem.database.model');

OrderDatabaseModel.hasMany(OrderItemDatabaseModel, {
  foreignKey: 'orderId',
  as: 'items',          
});

OrderItemDatabaseModel.belongsTo(OrderDatabaseModel, {
  foreignKey: 'orderId',
  as: 'order',
});

module.exports = {
  OrderDatabaseModel,
  OrderItemDatabaseModel,
};