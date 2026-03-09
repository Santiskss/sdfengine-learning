const { OrderDatabaseModel, OrderItemDatabaseModel } = require('../adapters/database/models');
const connectionDatabase = require('../adapters/database/models/connection.database');
const { orderMapper } = require('../adapters/database/mappers');

class OrderDatabaseRepository {
  constructor({ logAdapter }) {
    this.logAdapter = logAdapter.getInstance('OrderDatabaseRepository', {});
  }

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
      throw new Error(`Error al crear order con items: ${error.message}`);
    }
  }

  async getById(id) {
    const order = await OrderDatabaseModel.findByPk(id, {
      include: [{ association: 'items' }],
    });

    return order ? orderMapper(order.get({ plain: true })) : null;
  }
}

module.exports = OrderDatabaseRepository;