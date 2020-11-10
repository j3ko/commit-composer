/* eslint-disable */
const path = require('path');

const loadCommitlint = function (pkg) {
  return require(`./node_modules/@commitlint/${pkg}/index.js`);
};

const loadConventional = function (pkg) {
  return require(`./node_modules/conventional-changelog${pkg}/index.js`);
};

const shim = function (pkg) {
  let result = {};
  const segments = (pkg || '').split(path.sep);
  const commitlintIdx = segments.indexOf(`@commitlint`);
  const match = (pkg || '').match(/.*\/conventional-changelog(?<suffix>.*)\/.*/);

  if (commitlintIdx > -1) {
    result = loadCommitlint(segments[commitlintIdx + 1]);
  } else if (match && match.length > 0) {
    result = loadConventional(match.groups.suffix);
  }

  return result;
};

export default shim;
