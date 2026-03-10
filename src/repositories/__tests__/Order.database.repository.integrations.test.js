require('dotenv').config();

const OrderDatabaseRepository = require('../Order.database.repository');
const { OrderModel, OrderItemModel } = require('../../domain');

const logAdapterStub = {
  getInstance: () => ({
    log: jest.fn(),
    error: jest.fn(),
  }),
};

describe('OrderDatabaseRepository (integration)', () => {
  let repository;

  beforeAll(() => {
    repository = new OrderDatabaseRepository({ logAdapter: logAdapterStub });
  });

  it('creates order with items and retrieves it', async () => {
    const order = new OrderModel({
      id: null,
      customerId: 1,
      totalAmount: 30,
      status: 'pending',
      createdAt: new Date(),
    });

    const items = [
      new OrderItemModel({
        id: null,
        orderId: null,
        productId: 1,
        quantity: 2,
        unitPrice: 15,
      }),
    ];

    const created = await repository.createWithItems({ order, items });

    expect(created.id).toBeDefined();
    expect(created.customerId).toBe(1);
    expect(created.items).toHaveLength(1);

    const fetched = await repository.getById(created.id);

    expect(fetched).not.toBeNull();
    expect(fetched.id).toBe(created.id);
    expect(fetched.items).toHaveLength(1);
    expect(fetched.items[0].quantity).toBe(2);
  });

  it('returns null for non-existent order', async () => {
    const result = await repository.getById(999999);
    expect(result).toBeNull();
  });
});