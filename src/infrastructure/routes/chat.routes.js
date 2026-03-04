const express = require('express');
const { chatController } = require('../controllers/ChatController');
const router = express.Router();

router.post('/send', chatController);

module.exports = router;