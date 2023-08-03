'use strict';

console.log('nyc-config');
/*
We need to instrument code in order to get coverage from Cypress tests.
As most of our test are Cypress e2e tests, if we dont get coverage from Cypress, we won't be able to pass the Quality Gates.

By default, @istanbuljs/nyc-config-typescript only adds 'typecsript' as parser.
but we also need "jsx" in order to instrument file with JSX in it.
See https://github.com/istanbuljs/nyc/issues/1334#issuecomment-773043754
*/
const { parserPlugins } = require('@istanbuljs/schema').defaults.nyc;

module.exports = {
  cache: false,
  parserPlugins: parserPlugins.concat('typescript', 'jsx'),
};
