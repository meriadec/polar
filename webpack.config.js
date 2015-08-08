module.exports = {

  entry   : './app.js',

  output : {
    filename : 'bundle.js'
  },

  module : {
    preLoaders : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders : [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]'
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css/, exclude: /node_modules/, loader: 'style-loader!css-loader!autoprefixer-loader' }
    ]
  },

  jshint : {
    esnext: true
  }

};
