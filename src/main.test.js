// jest.dontMock('request');

const {lamda} = require('./main');

test('first test', done => {
  lamda(null, null, (error, captions) => {
    expect(captions[0].text).toBe('Satya Nadella sitting on a bench');
    done();
  });
});
