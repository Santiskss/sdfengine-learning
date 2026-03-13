const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');
const errorHandlerMiddleware = require('./middlewares/errorHandler.middleware');

class HttpServer {
  constructor({ orderController, userController }) {
    this.app = express();
    this._setupMiddlewares();
    this._setupRoutes({ orderController, userController });
    this._setupErrorHandler();
  }

  _setupMiddlewares() {
    this.app.use(express.json());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  _setupRoutes({ orderController, userController }) {
    this.app.use('/api/orders', orderRoutes({ orderController }));
    this.app.use('/api/users', userRoutes({ userController }));
  }

  _setupErrorHandler() {
    this.app.use(errorHandlerMiddleware);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`API docs: http://localhost:${port}/api-docs`);
    });
  }
}

module.exports = HttpServer;