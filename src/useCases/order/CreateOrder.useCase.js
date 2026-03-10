const { OrderModel, OrderItemModel } = require('../../domain');
const { orderRepository } = require('../../repositories');

class CreateOrderUseCase {
  constructor({ logAdapter }) {
    this.orderRepository = orderRepository;
    this.logAdapter = logAdapter.getInstance('CreateOrderUseCase', {});
  }

  async invoke({ customerId, items }) {
    this.logAdapter.log({ 
      message: 'Creating order', 
      data: { customerId, itemCount: items?.length } 
    });
    try{
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
        this.logAdapter.log({ message: 'Order created', data: { error: error.message } });
        throw error;

    }
  }
}

module.exports = CreateOrderUseCase;