const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader' 
        }
      },
      {
        test: /\.scss$/, 
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'sass-loader' 
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, 
        type: 'asset/resource' 
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ 
      filename: 'styles.css'
    })
  ],
  resolve: {
    extensions: ['.js', '.scss'] 
  }
};

