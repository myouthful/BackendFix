const express = require('express');
const router = express.Router();
const accountController = require('../controllers/lookupaccount.controller');
const logger = require('../utils/logger');

router.use((req, res, next) => {
  logger.info('[Lookup Route] Handling request:', {
    method: req.method,
    url: req.url,
    body: req.body
  });
  next();
});

logger.info('Loading lookupaccount routes'); // Add debug log
router.get('/ ', accountController.getAccountName);

module.exports = router;