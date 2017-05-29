var path = require('path');
var webpack = require('webpack');
var multi = require('multi-loader');

module.exports = [
    {
        entry: './test/app.js',
        output: {
            path: path.resolve('test/results'),
            filename: 'app.[hash].js'
        },
        module: {
            rules: [
                {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options:{
                                name: "[name].[hash].webp"
                            }
                        },
                        {
                            loader:require.resolve('../'),
                            options: {
                                quality: 50
                            }
                        }
                    ]
                },
                {
                    test: /.*\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options:{
                                name: "[name].[hash].[ext]"
                            }
                        }
                    ]
                }
            ]
        }
    }
];
