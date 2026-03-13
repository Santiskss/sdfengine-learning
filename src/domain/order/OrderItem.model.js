class OrderItemModel {
  /**
   * @param {object} params
   * @param {number|null} params.id
   * @param {number|null} params.orderId
   * @param {number} params.productId
   * @param {number} params.quantity
   * @param {number} params.unitPrice
   */
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

  /** @returns {number} */
  getSubtotal() {
    return this.quantity * this.unitPrice;
  }

  /** @returns {boolean} */
  isValid() {
    return this.productId != null && this.quantity > 0 && this.unitPrice >= 0;
  }
}

module.exports = OrderItemModel;
