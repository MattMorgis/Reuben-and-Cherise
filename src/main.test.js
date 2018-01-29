// jest.dontMock('request');

const {lamda} = require('./main');

test('first test', done => {
  lamda(null, null, (error, media) => {
    expect(media.captions[0].text).toBe('Satya Nadella sitting on a bench');
    done();
  });
});
