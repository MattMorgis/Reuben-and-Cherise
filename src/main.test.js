const {lamda} = require('./main');

test('first test', () => {
  lamda(null, null, (error, caption) => {
    expect(caption).toBe('Helllllllo, Lamda!');
  })
});