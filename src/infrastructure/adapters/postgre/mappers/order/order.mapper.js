const { OrderModel } = require('../../../../domain/order');
const orderItemMapper = require('./orderItem.mapper');

/**
 * Maps a plain database record (with nested items) to a domain OrderModel.
 * @param {{ items?: object[], [key: string]: any }} record
 * @returns {import('../../../../domain/order/Order.model')}
 */
const orderMapper = ({ items, ...data }) =>
  new OrderModel({
    ...data,
    items: items ? items.map(orderItemMapper) : [],
  });

module.exports = orderMapper;
