

module.exports = function getFingerprint(req) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  // more headers or logic will be added for a stronger fingerprint
  return Buffer.from(userAgent + '|' + acceptLanguage).toString('base64');
};
