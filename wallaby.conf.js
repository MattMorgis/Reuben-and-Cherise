require('dotenv').config();

module.exports = () => {
  return {
    files: ['src/**/*.js', '!src/**/*.test.js', '__mocks__/**/*.js'],

    tests: ['src/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',
  };
};
