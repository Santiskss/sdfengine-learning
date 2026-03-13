const { OrderDatabaseModel, OrderItemDatabaseModel } = require('../adapters/postgre/models/order');
const connectionDatabase = require('../adapters/postgre/models/connection.database');
const { orderMapper } = require('../adapters/postgre/mappers');
const OrderRepository = require('../../domain/order/Order.repository');

class OrderDatabaseRepository extends OrderRepository {
  /**
   * @param {object} params
   * @param {import('../adapters/logs').LogAdapter} params.logAdapter
   */
  constructor({ logAdapter }) {
    super();
    this.logAdapter = logAdapter.getInstance('OrderDatabaseRepository', {});
  }

  /**
   * Persists the order and all its items inside a single database transaction.
   * Rolls back automatically on failure.
   * @param {object} params
   * @param {import('../../domain/order/Order.model')} params.order
   * @param {import('../../domain/order/OrderItem.model')[]} params.items
   * @returns {Promise<import('../../domain/order/Order.model')>}
   * @throws {Error}
   */
  async createWithItems({ order, items }) {
    console.log('DATOS RECIBIDOS EN REPO:', order);
    const sequelize = connectionDatabase.sequelize;
    const transaction = await sequelize.transaction();

    try {
      const createdOrder = await OrderDatabaseModel.create(
        {
          customerId: order.customerId,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt || new Date(),
        },
        { transaction }
      );

      if (items?.length) {
        await OrderItemDatabaseModel.bulkCreate(
          items.map((item) => ({
            orderId: createdOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          { transaction }
        );
      }

      await transaction.commit();

      const fullOrder = await OrderDatabaseModel.findByPk(createdOrder.id, {
        include: [{ association: 'items' }],
      });

      return orderMapper(fullOrder.get({ plain: true }));
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Error creating order with items: ${error.message}`);
    }
  }

  /**
   * @param {number|string} id
   * @returns {Promise<import('../../domain/order/Order.model')|null>}
   * @throws {Error}
   */
  async getById(id) {
    try {
      const order = await OrderDatabaseModel.findByPk(id, {
        include: [{ association: 'items' }],
      });

      return order ? orderMapper(order.get({ plain: true })) : null;
    } catch (error) {
      throw new Error(`Error getting order with id ${id}: ${error.message}`);
    }
  }
}

module.exports = OrderDatabaseRepository;
