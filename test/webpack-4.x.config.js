var path = require('path');
var multi = require('multi-loader');

module.exports = [
  {
    mode: 'development',
    entry: './test/app.js',
    output: {
      path: path.resolve('test/results'),
      filename: 'app.[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g)$/i,
          use: multi(
            'file-loader?name=[name].[hash].webp!../index.js?{quality: 50}',
            'file-loader?name=[name].[hash].[ext]'
          )
        },
      ]
    }
  }
];
