class OrderItemModel {
  constructor({
    id,
    orderId,
    productId,
    quantity,
    unitPrice,
  }) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  getSubtotal() {
    return this.quantity * this.unitPrice;
  }

  isValid() {
    return this.productId != null && this.quantity > 0 && this.unitPrice >= 0;
  }
}

module.exports = OrderItemModel;