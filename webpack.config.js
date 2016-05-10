var path = require('path');

module.exports = {

	entry: './app/index.js',

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/assets'
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/
			}
		]
	},

	resolve: {
		extensions: ['', '.js', '.jsx', '.es6']
	},

	debug: true,
	devtool: 'inline-source-map'	
	
}