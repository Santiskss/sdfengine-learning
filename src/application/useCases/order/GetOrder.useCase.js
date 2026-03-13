const { orderRepository } = require('../../../infrastructure/repositories');

class GetOrderUseCase {
  /**
   * @param {object} params
   * @param {import('../../../infrastructure/adapters/logs').LogAdapter} params.logAdapter
   */
  constructor({ logAdapter }) {
    this.orderRepository = orderRepository;
    this.logAdapter = logAdapter.getInstance('GetOrderUseCase', {});
  }

  /**
   * Retrieves an order by ID. Throws if not found.
   * @param {object} params
   * @param {number} params.orderId
   * @returns {Promise<import('../../../domain/order/Order.model')>}
   * @throws {Error} If the order does not exist.
   */
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
