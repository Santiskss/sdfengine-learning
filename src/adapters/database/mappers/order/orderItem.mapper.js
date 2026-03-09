const { OrderItemModel } = require('../../../../domain/order');

const orderItemMapper = (data) => new OrderItemModel({ ...data });

module.exports = orderItemMapper;