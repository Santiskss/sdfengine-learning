class OrderModel {
    constructor({
      id,
      customerId,
      totalAmount,
      status = 'pending',
      createdAt,
      items = [],
    }) {
      this.id = id;
      this.customerId = customerId;
      this.totalAmount = totalAmount;
      this.status = status;
      this.createdAt = createdAt;
      this.items = items;
    }
  
    canBeModified() {
      return this.status === 'pending';
    }
  
    canBeCancelled() {
      return this.status === 'pending' || this.status === 'confirmed';
    }
  
    cancel() {
      if (!this.canBeCancelled()) {
        throw new Error(`Cannot cancel order from status ${this.status}`);
      }
      this.status = 'cancelled';
    }
  
    confirm() {
      if (this.status !== 'pending') {
        throw new Error(`Cannot confirm order from status ${this.status}`);
      }
      this.status = 'confirmed';
    }
  }
  
  module.exports = OrderModel;