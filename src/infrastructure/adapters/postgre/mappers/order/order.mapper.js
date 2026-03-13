const { OrderModel } = require('../../../../domain/order');
const orderItemMapper = require('./orderItem.mapper');

const orderMapper = ({ items, ...data }) =>
  new OrderModel({
    ...data,
    items: items ? items.map(orderItemMapper) : [],
  });

module.exports = orderMapper;