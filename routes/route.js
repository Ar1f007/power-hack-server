const express = require('express');
const { addBill, getBills, deleteBill, updateBill } = require('../controller/billController');
const { register, login } = require('../controller/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-billing', addBill);

router.get('/billing-list', getBills);
router.patch('/update-billing/:id', updateBill);
router.delete('/delete-billing/:id', deleteBill);

module.exports = router;
