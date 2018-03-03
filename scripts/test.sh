#!/bin/bash

set -e

npm i --save-dev -q "webpack@$WEBPACK_VERSION" && \
  node_modules/.bin/webpack --config "test/webpack-$WEBPACK_VERSION.config.js"
