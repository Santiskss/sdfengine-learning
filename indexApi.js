require('dotenv').config();
require('dotenv').config({ path: '.env.project' });

const HttpServer = require('./src/infrastructure/adapters/http/server');
const OrderController = require('./src/infrastructure/adapters/http/controllers/Order.controller');
const UserController = require('./src/infrastructure/adapters/http/controllers/User.controller');
const CreateOrderUseCase = require('./src/application/useCases/order/CreateOrder.useCase');
const GetOrderUseCase = require('./src/application/useCases/order/GetOrder.useCase');
const CreateUserUseCase = require('./src/application/useCases/user/CreateUser.useCase');
const { userRepository } = require('./src/infrastructure/repositories');
const { logAdapter } = require('./src/infrastructure/adapters/logs');

const createOrderUseCase = new CreateOrderUseCase({ logAdapter });
const getOrderUseCase = new GetOrderUseCase({ logAdapter });

const createUserUseCase = new CreateUserUseCase(userRepository);

const orderController = new OrderController({
  createOrderUseCase,
  getOrderUseCase,
  logAdapter,
});

const userController = new UserController({
  createUserUseCase,
});

const server = new HttpServer({ orderController, userController });

const port = process.env.PORT || 3000;
server.listen(port);
