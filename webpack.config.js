const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = process.env.NODE_ENV;
const config = {
    mode: env || 'development',
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.tsx'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.js$/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: [
                "vue-style-loader",
                "css-loader"
            ]
        }, {
            test: /\.scss$/,
            use: [
                "vue-style-loader",
                "css-loader",
                "sass-loader"
            ]
        }, {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        }, {
            test: /\.jsp$/,
            loader: 'html-loader'
        }]
    },
    entry: {
        home: path.resolve(__dirname, 'src/main/websrc/entry.ts')
    },
    output: {
        path: path.resolve(__dirname, 'target/web/'),
        filename: "[name].[chunkhash].js",
        chunkFilename: '[id].chunk.[chunkhash].js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/main/websrc/tpl.jsp'),
            filename: path.resolve(__dirname, 'target/web/index.jsp'),
            chunks:['home'],
            inject: 'body'
        })
    ]
    /*,
    plugins: [
        new config.optimization.splitChunks({
            filename:'commons.js',
            name:'commons'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/main/websrc/tpl.jsp'),
            filename: path.resolve(__dirname, 'target/web/index.jsp'),
            chunks: ['commons'],
            inject: 'body'
        })
    ]
    */
};
const exconfig = {
    mode: env || 'development',
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    entry: {
        extract: path.resolve(__dirname, 'src/main/websrc/themes/extract.ts')
    },
    output: {
        path: path.resolve(__dirname, 'target/web/'),
        filename: "[name].[chunkhash].js",
        chunkFilename: '[id].chunk.[chunkhash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};

module.exports = [config, exconfig];