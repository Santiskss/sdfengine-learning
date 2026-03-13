const { OrderItemModel } = require('../../../../domain/order');

/**
 * Maps a plain database record to a domain OrderItemModel.
 * @param {object} data
 * @returns {import('../../../../domain/order/OrderItem.model')}
 */
const orderItemMapper = (data) => new OrderItemModel({ ...data });

module.exports = orderItemMapper;
