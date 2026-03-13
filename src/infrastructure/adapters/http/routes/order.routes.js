const express = require('express');

/**
 * @param {object} params
 * @param {import('../controllers/Order.controller')} params.orderController
 * @returns {import('express').Router}
 */
function orderRoutes({ orderController }) {
  const router = express.Router();

  router.post('/', (req, res, next) => orderController.create(req, res, next));

  router.get('/:id', (req, res, next) => orderController.getById(req, res, next));

  return router;
}

module.exports = orderRoutes;
