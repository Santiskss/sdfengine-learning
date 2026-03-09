const { orderRepository } = require('../../repositories');

class GetOrderUseCase {
  constructor({ logAdapter }) {
    this.orderRepository = orderRepository;
    this.logAdapter = logAdapter.getInstance('GetOrderUseCase', {});
  }

  async invoke({ orderId }) {
    this.logAdapter.log({ 
      message: 'Getting order', 
      data: { orderId } 
    });

    const order = await this.orderRepository.getById(orderId);

    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }

    return order;
  }
}

module.exports = GetOrderUseCase;