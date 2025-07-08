const getFingerprint = require('../utils/fingerprint');

module.exports = (app) => {
  // Set trust proxy for Express
  app.set('trust proxy', true);

  // Middleware to collect IP and fingerprint
  app.use((req, res, next) => {
    req.clientIp = req.ip;
    req.fingerprint = getFingerprint(req);
    next();
  });
};
