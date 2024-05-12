const express = require('express');
const router = express.Router();
const loginController = require('../controllers/registerController');

router.post('/', loginController.handleRegister);

module.exports = router;