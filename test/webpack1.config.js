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
            'file?name=[name].[hash].webp!../index.js?{quality: 50}',
            'file?name=[name].[hash].[ext]'
          )
        },
      ]
    }
  }
];
