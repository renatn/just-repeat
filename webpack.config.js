var path = require('path');

module.exports = {

	entry: {
		app: './app/index.js',
    vendor: ['react', 'react-dom', 'redux', 'classnames', 'react-redux']
	},

	output: {
		path: path.join(__dirname, 'public/assets'),
		filename: '[name].js',
		publicPath: '/assets/'
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

