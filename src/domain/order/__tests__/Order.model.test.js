const OrderModel = require('../Order.model');

describe('OrderModel', () => {
  test('should create an order with default values', () => {
    const order = new OrderModel({
      customerId: 1,
      totalAmount: 100,
    });
    expect(order.customerId).toBe(1);
    expect(order.totalAmount).toBe(100);
    expect(order.status).toBe('pending');
    expect(order.items).toEqual([]);
  });

  test('should verify if it can be cancelled', () => {
    const order = new OrderModel({ status: 'pending' });
    expect(order.canBeCancelled()).toBe(true);
    order.status = 'confirmed';
    expect(order.canBeCancelled()).toBe(true);
    order.status = 'shipped';
    expect(order.canBeCancelled()).toBe(false);
  });

  test('should cancel an order', () => {
    const order = new OrderModel({ status: 'pending' });
    order.cancel();
    expect(order.status).toBe('cancelled');
  });

  test('should throw error when cancelling an order that cannot be cancelled', () => {
    const order = new OrderModel({ status: 'shipped' });
    expect(() => order.cancel()).toThrow('Cannot cancel order from status shipped');
  });

  test('should confirm an order', () => {
    const order = new OrderModel({ status: 'pending' });
    order.confirm();
    expect(order.status).toBe('confirmed');
  });

  test('should throw error when confirming an order that is not pending', () => {
    const order = new OrderModel({ status: 'confirmed' });
    expect(() => order.confirm()).toThrow('Cannot confirm order from status confirmed');
  });
});