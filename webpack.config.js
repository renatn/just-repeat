var path = require('path');

module.exports = {

	entry: {
		app: './app/index.js',
		vendor: ['react', 'react-dom']
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/assets'
	},

	debug: true,
	devtool: 'inline-source-map'	
	
}