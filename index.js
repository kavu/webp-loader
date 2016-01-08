// Copyright (C) 2016 Max Riveiro <kavu13@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var Imagemin = require('imagemin');
var imageminWebp = require('imagemin-webp');
var loaderUtils = require('loader-utils');

module.exports = function(content) {
  this.cacheable && this.cacheable();

  var callback = this.async();
  var called = false;

  var query = loaderUtils.parseQuery(this.query);
  var options = {
    preset: query.preset || 'default',
    quality: query.quality || 75,
    alphaQuality: query.alphaQuality || 100,
    method: query.method || 1,
    sns: query.sns || 80,
    autoFilter: query.autoFilter || false,
    sharpness: query.sharpness || 0,
    lossless: query.lossless || false,
    bypassOnDebug: query.bypassOnDebug || false,
  };

  if (query.size) {
    options.size = query.size;
  }

  if (query.filter) {
    options.filter = query.filter;
  }

  if (this.debug === true && options.bypassOnDebug === true) {
    return callback(null, content);
  } else {
    var imagemin = new Imagemin()
      .src(content)
      .use(imageminWebp(options));

    imagemin.run(function(err, files) {
      if (called) {
        return;
      }

      called = true;

      if (err) {
        callback(err);
      } else {
        callback(null, files[0].contents);
      }
    });
  }
};

module.exports.raw = true;
