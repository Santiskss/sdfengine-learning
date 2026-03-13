const express = require('express');

function userRoutes({ userController }) {
  const router = express.Router();

  router.post('/', (req, res, next) => userController.create(req, res, next));

  



  return router;
}

module.exports = userRoutes;
