#!/bin/bash

set -e

rm -rf "node_modules/"

npm i --save-dev -q "webpack@$WEBPACK_VERSION" && \
  node_modules/.bin/webpack --config test/webpack.config.js
