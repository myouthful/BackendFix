const express = require('express');
const router = express.Router();
const transferHistoryController = require('../controllers/transferHistory.controller');

// Get transaction history for an account
router.get('/history/:accountNumber', transferHistoryController.getTransactionHistory);

module.exports = router;