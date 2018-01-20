// jest.dontMock('request');

const {lamda} = require('./main');

test('first test', done => {
  lamda(null, null, (error, caption) => {
    expect(caption).toBe('Satya Nadella sitting on a bench');
    done();
  });
});
