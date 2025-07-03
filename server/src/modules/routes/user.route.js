const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/get', userController.getCustomer);
router.post('/create', userController.createUser);
module.exports = router;
