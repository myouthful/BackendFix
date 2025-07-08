const getFingerprint = require('../src/utils/fingerprint');

describe('Fingerprint Utility', () => {
  it('should return a string fingerprint', () => {
    const req = {
      headers: {
        'user-agent': 'Mozilla/5.0',
        'accept-language': 'en-US,en;q=0.9'
      }
    };
    const fingerprint = getFingerprint(req);
    expect(typeof fingerprint).toBe('string');
    expect(fingerprint.length).toBeGreaterThan(0);
  });

  it('should handle missing headers gracefully', () => {
    const req = { headers: {} };
    const fingerprint = getFingerprint(req);
    expect(typeof fingerprint).toBe('string');
  });
});
