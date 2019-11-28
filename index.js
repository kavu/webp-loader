// Copyright (C) 2016 Max Riveiro <kavu13@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var imagemin = require('imagemin');
var imageminWebp = require('imagemin-webp');
var loaderUtils = require('loader-utils');

module.exports = function (content) {
  this.cacheable && this.cacheable();

  var query = loaderUtils.getOptions(this) || {};
  var configKey = query.config || 'webpLoader';
  var options = this.options && this.options[configKey] || {};
  var config = Object.assign({}, options, query);

  var callback = this.async();

  if (this.debug === true && config.bypassOnDebug === true) {
    return callback(null, content);
  } else {
    imagemin
      .buffer(content,{
        plugins: [imageminWebp(config)]
      })
      .then(function(data){
        callback(null, data);
      })
      .catch(function(err){
        callback(err);
      });
  }
};

module.exports.raw = true;
