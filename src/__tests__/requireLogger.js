test('Check If Module Required', () => {
  const Logger = require('../../lib/index').default;

  expect(typeof Logger).toBe('function');
});
