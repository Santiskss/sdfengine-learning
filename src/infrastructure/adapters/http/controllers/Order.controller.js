class OrderController {
  /**
   * @param {object} params
   * @param {import('../../../../useCases/order/CreateOrder.useCase')} params.createOrderUseCase
   * @param {import('../../../../useCases/order/GetOrder.useCase')} params.getOrderUseCase
   * @param {import('../../logs').LogAdapter} params.logAdapter
   */
  constructor({ createOrderUseCase, getOrderUseCase, logAdapter }) {
    this.createOrderUseCase = createOrderUseCase;
    this.getOrderUseCase = getOrderUseCase;
    this.logAdapter = logAdapter.getInstance('OrderController', {});
  }

  /**
   * POST /api/orders
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { customerId, items } = req.body;
      const order = await this.createOrderUseCase.invoke({ customerId, items });

      res.status(201).json({
        success: true,
        data: {
          id: order.id,
          customerId: order.customerId,
          totalAmount: order.totalAmount,
          status: order.status,
          items: order.items,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/orders/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const orderId = parseInt(req.params.id, 10);
      const order = await this.getOrderUseCase.invoke({ orderId });

      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
