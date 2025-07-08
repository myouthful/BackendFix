const express = require('express');
const router = express.Router();
const lookupController = require('../controllers/lookup.controller');

router.post('/', lookupController.lookupAccount);

module.exports = router;