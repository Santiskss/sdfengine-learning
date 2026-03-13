const { OrderModel, OrderItemModel } = require('../../../domain');
const { orderRepository } = require('../../../infrastructure/repositories');

class CreateOrderUseCase {
  /**
   * @param {object} params
   * @param {import('../../../infrastructure/adapters/logs').LogAdapter} params.logAdapter
   */
  constructor({ logAdapter }) {
    this.orderRepository = orderRepository;
    this.logAdapter = logAdapter.getInstance('CreateOrderUseCase', {});
  }

  /**
   * Validates and creates a new order with its items, computing the total amount.
   * @param {object} params
   * @param {number} params.customerId
   * @param {{ productId: number, quantity: number, unitPrice: number }[]} params.items
   * @returns {Promise<OrderModel>}
   * @throws {Error} If items list is empty or any item has invalid fields.
   */
  async invoke({ customerId, items }) {
    this.logAdapter.log({
      message: 'Creating order',
      data: { customerId, itemCount: items?.length }
    });
    try {
      if (!items?.length) {
        throw new Error('Order must have at least one item');
      }

      for (const item of items) {
        if (!item.productId || item.quantity <= 0 || item.unitPrice < 0) {
          throw new Error(`Invalid item: productId=${item.productId}, quantity=${item.quantity}`);
        }
      }

      const orderItems = items.map(
        (item) =>
          new OrderItemModel({
            id: null,
            orderId: null,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })
      );

      const totalAmount = orderItems.reduce((sum, item) => sum + item.getSubtotal(), 0);

      const order = new OrderModel({
        id: null,
        customerId,
        totalAmount,
        status: 'pending',
        createdAt: new Date(),
        items: orderItems,
      });

      const result = await this.orderRepository.createWithItems({
        order,
        items: orderItems
      });

      this.logAdapter.log({
        message: 'Order created',
        data: { orderId: result.id, totalAmount }
      });

      return result;

    } catch (error) {
      this.logAdapter.log({ message: 'Order creation failed', data: { error: error.message } });
      throw error;
    }
  }
}

module.exports = CreateOrderUseCase;
