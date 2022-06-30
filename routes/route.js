const express = require('express');
const { addBill } = require('../controller/billController');
const { register, login } = require('../controller/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-billing', addBill);

module.exports = router;
