#!/bin/bash

set -e

yarn add --dev "webpack@$WEBPACK_VERSION" && \
  node_modules/.bin/webpack --config "test/webpack-$WEBPACK_VERSION.config.js"
