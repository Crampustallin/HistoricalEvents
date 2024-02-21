const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.ts', 
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/, 
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader' 
				}
			},
			{
				test: /\.s[ac]ss$/, 
				use: [
					'style-loader',
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
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
	],
	resolve: {
		extensions: ['.tsx','.ts','.js', '.scss'] 
	},
	mode: 'development',
};

