const path = require('path');

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
				use: 'ts-loader',         
				exclude: /node_modules/
			},
			{
				test: /\.css$/,  
				use: ['style-loader', 'css-loader']       
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,        
				type: 'asset/resource'       
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']   
	}
};
