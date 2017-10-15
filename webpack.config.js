/**
 * webpack configuration for the app
 * @author gaurav sharma
 */
const path = require ('path');
// html-webpack-plugin automatically configures the dynamic HTML page.
// plugin by-default gives us a boilerplate HTML file for our application or we can specify the template
// using the template option in plugin (like we have provided below).
// it automatically adds a script element referencing to the webpack js build.
const HtmlWebpackPlugin = require ('html-webpack-plugin');
// we have global CSS and the component CSS. Configuration already processes the component CSS but not the
// global CSS. define a boundary to load component and global CSS.
// CSS in /src/app is to be configured by angular2-template-loader
// CSS in /src/ is to be bundled and included as a link element in the index.html file.
// thi plugin provides bundling functionality. In the end, we get a combined CSS file.
// it is configured BOTH as loader and plugin.
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

// the source context directory
// all the further paths provided are relative to the context provided
const source = path.resolve (__dirname, 'src');

// the app directory that contains the TS code
const appDirectory = path.resolve (source, 'app');

// the output directory
const destination = path.resolve (__dirname, 'dist');

module.exports = {
	context: source,
	entry: [
		'./index.ts',
		'./styles.css'
	],
	output: {
		filename: 'index.js',
		path: destination
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
					'awesome-typescript-loader',
					'angular2-template-loader'
				]
			}, 
			{
				test: /\.(css|html)$/,
				include: appDirectory,
				loader: 'raw-loader'
			},
			{
				test: /\.css$/,
				exclude: appDirectory,
				loader: ExtractTextPlugin.extract ({
					fallback: 'style-loader',
					use: 'css-loader?sourceMap'
				})
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new ExtractTextPlugin ('app-style.css')
	]
}