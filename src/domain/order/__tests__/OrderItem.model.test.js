const OrderItemModel = require('../OrderItem.model');

describe('OrderItemModel', () => {
  describe('getSubtotal', () => {
    it('returns quantity multiplied by unitPrice', () => {
      const item = new OrderItemModel({ quantity: 3, unitPrice: 10.5 });
      expect(item.getSubtotal()).toBe(31.5);
    });
    it('returns 0 for zero quantity', () => {
      const item = new OrderItemModel({ quantity: 0, unitPrice: 10 });
      expect(item.getSubtotal()).toBe(0);
    });
  });

  describe('isValid', () => {
    it('returns true for valid item', () => {
      const item = new OrderItemModel({ productId: 1, quantity: 2, unitPrice: 5 });
      expect(item.isValid()).toBe(true);
    });
    it('returns false when productId is null', () => {
      const item = new OrderItemModel({ productId: null, quantity: 2, unitPrice: 5 });
      expect(item.isValid()).toBe(false);
    });
    it('returns false when quantity is 0', () => {
      const item = new OrderItemModel({ productId: 1, quantity: 0, unitPrice: 5 });
      expect(item.isValid()).toBe(false);
    });
  });
});