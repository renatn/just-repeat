var path = require('path');

module.exports = {

	entry: './app/index.js',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/assets'
	},

	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}]
	},

	debug: true,
	devtool: 'inline-source-map'	
	
}