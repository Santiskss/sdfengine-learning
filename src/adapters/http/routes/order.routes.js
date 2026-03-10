const express = require('express');

function orderRoutes({ orderController }) {
  const router = express.Router();

  router.post('/', (req, res, next) => orderController.create(req, res, next));

  router.get('/:id', (req, res, next) => orderController.getById(req, res, next));

  return router;
}

module.exports = orderRoutes;