const OrderModel = require('./Order.model');

class OrderRepository {
  /**
   * Persists a new order together with its items in a single atomic operation.
   * @param {object} params
   * @param {OrderModel} params.order
   * @param {import('./OrderItem.model')[]} params.items
   * @returns {Promise<OrderModel>}
   */
  async createWithItems({ order, items }) {
    throw new Error('Method createWithItems() must be implemented');
  }

  /**
   * Retrieves an order by its ID, including its items.
   * @param {number|string} id
   * @returns {Promise<OrderModel|null>}
   */
  async getById(id) {
    throw new Error('Method getById() must be implemented');
  }
}

module.exports = OrderRepository;
