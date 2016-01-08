# webp-loader

[WebP](https://developers.google.com/speed/webp/) image loader & converter loader for Webpack.

## Install

```sh
npm install webp-loader --save-dev
```

## Usage

Here is the example of using `webp-loader` along with common [file-loader](https://github.com/webpack/file-loader):

```javascript
loaders: [
  {
    test: /\.(jpe?g|png)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'webp'
    ]
  }
]
```
Unfortunately, if you wish to pass an options for internal [imagemin-webp](https://github.com/imagemin/imagemin-webp) you should pass a options in JSON form:


```javascript
loaders: [
  {
    test: /\.(jpe?g|png)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'webp?{quality: 13}'
    ]
  }
]
```

Normally you don't want to convert all of your images to WebP format, you just want to make alternate versions. You can use [multi-loader](https://github.com/webpack/multi-loader) to achieve it:

```javascript
loaders: [
  {
    test: /\.(jpe?g|png)$/i,
    loader: multi(
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'file?hash=sha512&digest=hex&name=[hash].[ext].webp!webp?{quality: 75}'
    )
  },
]
```

## Options

For all possible options please visit "API" section of the official [imagemin-webp README  ](https://github.com/imagemin/imagemin-webp#imageminwebpoptions).

## Inspiration

`webp-loader` is heavily inspired by [tcoopman/image-webpack-loader](https://github.com/tcoopman/image-webpack-loader).

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
