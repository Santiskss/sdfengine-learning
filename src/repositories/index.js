const OrderDatabaseRepository = require('./Order.database.repository');
const { logAdapter } = require('../adapters/logs');

const orderRepository = new OrderDatabaseRepository({ logAdapter });

module.exports = {
    orderRepository,
};
