var path = require('path');
var multi = require('multi-loader');

module.exports = [
  {
    entry: './test/app.js',
    output: {
      path: path.resolve('test/results'),
      filename: 'app.[hash].js'
    },
    module: {
      loaders: [
        {
          test: /\.(png|jpe?g)$/i,
          loader: multi(
            'file-loader?name=[name].[hash].webp!../index.js?{quality: 50}',
            'file-loader?name=[name].[hash].[ext]'
          )
        },
      ]
    }
  }
];
