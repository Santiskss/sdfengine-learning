class OrderModel {
  /**
   * @param {object} params
   * @param {number|null} params.id
   * @param {number} params.customerId
   * @param {number} params.totalAmount
   * @param {'pending'|'confirmed'|'cancelled'} [params.status='pending']
   * @param {Date} [params.createdAt]
   * @param {import('./OrderItem.model')[]} [params.items=[]]
   */
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

  /** @returns {boolean} */
  canBeModified() {
    return this.status === 'pending';
  }

  /** @returns {boolean} */
  canBeCancelled() {
    return this.status === 'pending' || this.status === 'confirmed';
  }

  /**
   * Transitions the order to 'cancelled'. Throws if the current status does not allow cancellation.
   * @throws {Error}
   */
  cancel() {
    if (!this.canBeCancelled()) {
      throw new Error(`Cannot cancel order from status ${this.status}`);
    }
    this.status = 'cancelled';
  }

  /**
   * Transitions the order to 'confirmed'. Throws if the order is not in 'pending' status.
   * @throws {Error}
   */
  confirm() {
    if (this.status !== 'pending') {
      throw new Error(`Cannot confirm order from status ${this.status}`);
    }
    this.status = 'confirmed';
  }
}

module.exports = OrderModel;
