const express = require('express');
const request = require('supertest');
const deviceManager = require('../src/middleware/device-manager');

describe('Device Manager Middleware', () => {
  let app;
  beforeEach(() => {
    app = express();
    deviceManager(app);
    app.get('/test', (req, res) => {
      res.json({ ip: req.clientIp, fingerprint: req.fingerprint });
    });
  });

  it('should set trust proxy and attach clientIp and fingerprint', async () => {
    const res = await request(app)
      .get('/test')
      .set('User-Agent', 'TestAgent')
      .set('Accept-Language', 'en-US');
    expect(res.body).toHaveProperty('ip');
    expect(res.body).toHaveProperty('fingerprint');
    expect(typeof res.body.fingerprint).toBe('string');
  });
});
