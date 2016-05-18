var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './app/index.js',

	output: {
		path: path.join(__dirname, 'public/assets'),
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

	plugins: [
  		new webpack.NoErrorsPlugin(),
  		new webpack.DefinePlugin({
    		'process.env.NODE_ENV': JSON.stringify('production'),
    		__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  		}),
  		new webpack.optimize.OccurenceOrderPlugin(),
  		new webpack.optimize.DedupePlugin(),
  		new webpack.optimize.UglifyJsPlugin({
    		compress: {
      			warnings: false
    		}
		}),
	]	
}