const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonPaths = require("./paths");
const webpack = require("webpack");

module.exports = {
	mode: "production",
	output: {
		filename: `${commonPaths.jsFolder}/[name].[hash].js`,
		path: commonPaths.outputPath,
		chunkFilename: "[name].[chunkhash].js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader" // translates CSS into CommonJS modules
					},
					"sass-loader"
				]
			},
			{
				test: /jquery-ui\/.+\.js$/,
				use: {
					loader: "imports-loader?jQuery=jquery,$=jquery,this=>window"
				}
			}
		]
	},
	plugins: [
		/*new CleanWebpackPlugin([commonPaths.outputPath.split("/").pop()], {
		  root: commonPaths.root
		}),*/
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `${commonPaths.cssFolder}/[name].css`,
			chunkFilename: "[id].css"
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	devtool: "source-map"
};
