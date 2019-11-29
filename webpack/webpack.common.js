const webpack = require("webpack");
const convert = require("koa-connect");
const history = require("connect-history-api-fallback");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const commonPaths = require("./paths");
const Dotenv = require("dotenv-webpack");

module.exports = {
	entry: [commonPaths.entryPath, "react-hot-loader/patch"],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: require.resolve("babel-loader"),
				options: {
					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					// cacheDirectory: true,
					plugins: ["react-hot-loader/babel"]
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: commonPaths.imagesFolder,
							publicPath: "../" + commonPaths.imagesFolder
						}
					}
				]
			},
			{
				test: /\.(woff2|ttf|woff|eot)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: commonPaths.fontsFolder,
							publicPath: "../" + commonPaths.fontsFolder
						}
					}
				]
			},
			{ test: /\.xlsx$/, loader: "webpack-xlsx-loader" }
		]
	},
	serve: {
		add: app => {
			app.use(convert(history()));
		},
		content: commonPaths.entryPath,
		dev: {
			publicPath: commonPaths.outputPath
		},
		open: true
	},
	resolve: {
		modules: ["src", "node_modules"],
		extensions: ["*", ".js", ".jsx", ".css", ".scss"],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: commonPaths.templatePath
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: "async"
		}),
		new Dotenv({ path: "./.env" })
	]
};
