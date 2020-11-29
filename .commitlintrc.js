module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 50],
    'body-max-line-length': [2, 'always', 72],
    'scope-enum': [
      2,
      'always',
      ['editor', 'config', 'changelog', 'writeup', 'release', 'deps', 'commitlint', 'core'],
    ],
  },
};
