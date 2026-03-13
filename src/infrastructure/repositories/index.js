const OrderDatabaseRepository = require('./Order.database.repository');
const { logAdapter } = require('../adapters/logs');
const UserLocalRepository = require('./User.local.repository');
const UserDatabaseRepository = require('./User.database.repository');

const orderRepository = new OrderDatabaseRepository({ logAdapter });
const userDatabaseRepository = new UserDatabaseRepository();
const userLocalRepository = new UserLocalRepository();

module.exports = {
    orderRepository,
    userRepository: userDatabaseRepository,
};
