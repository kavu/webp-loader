var path = require('path');
var webpack = require('webpack');
var multi = require('multi-loader');

module.exports = [
  {
    name: 'browser',
    entry: './test/app.js',
    output: {
      path: path.resolve('test/results'),
      filename: 'app.[hash].js'
    },
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.(png|jpe?g)$/i,
          loader: multi(
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'file?hash=sha512&digest=hex&name=[hash].[ext].webp!../index.js?{quality: 75}'
          )
        },
      ]
    }
  }
];
