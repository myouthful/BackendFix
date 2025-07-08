const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');

// Transfer money route
router.post('/transfer', transactionController.transfer);

module.exports = router;