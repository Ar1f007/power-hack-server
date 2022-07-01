const express = require('express');
const { addBill, getBills, deleteBill, updateBill } = require('../controller/billController');
const { register, login } = require('../controller/userController');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-billing', verifyToken, addBill);

router.get('/billing-list', getBills);
router.patch('/update-billing/:id', verifyToken, updateBill);
router.delete('/delete-billing/:id', verifyToken, deleteBill);

module.exports = router;
