const CreateOrderUseCase = require('./order/CreateOrder.useCase');

const GetOrderUseCase = require('./order/GetOrder.useCase');

const { logAdapter } = require('../adapters/logs');

const createOrderUseCase = new CreateOrderUseCase({ logAdapter });

const getOrderUseCase = new GetOrderUseCase({ logAdapter });

module.exports = {
createOrderUseCase,
getOrderUseCase,
}