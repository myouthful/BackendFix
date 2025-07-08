const logger = require('../src/utils/logger');

describe('Logger Utility', () => {
  it('should have info, warn, and error methods', () => {
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('should log info without throwing', () => {
    expect(() => logger.info('Test info log')).not.toThrow();
  });

  it('should log error without throwing', () => {
    expect(() => logger.error('Test error log')).not.toThrow();
  });
});
