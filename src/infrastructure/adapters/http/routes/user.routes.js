const express = require('express');

/**
 * @param {object} params
 * @param {import('../controllers/User.controller')} params.userController
 * @returns {import('express').Router}
 */
function userRoutes({ userController }) {
  const router = express.Router();

  router.post('/', (req, res, next) => userController.create(req, res, next));

  return router;
}

module.exports = userRoutes;
