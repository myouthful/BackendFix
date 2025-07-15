// routes/kycRoutes.js
const express = require('express');
const { submitKYC } = require('../controllers/kyc.controller');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/kycUpload', upload.fields([
    { name: 'utilityBill', maxCount: 1 },
    { name: 'idDocument', maxCount: 1 }, 
  ]),
  submitKYC);

module.exports = router;
