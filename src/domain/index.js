const userModels = require('./user/User.model');
const orderModels = require('./order');

module.exports = {
    userModels,
    ...orderModels,
};