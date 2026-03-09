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
  }
  
  module.exports = OrderItemModel;