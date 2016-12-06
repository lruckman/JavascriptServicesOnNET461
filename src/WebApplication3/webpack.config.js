var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('vendor.bundle.css');

var clientBundleConfig = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ]
    },
    module: {
        loaders: [
            { test: /\.tsx$/, include: /ClientApp/, exclude: /node_modules/, loader: 'babel-loader' },
            /*{ test: /\.ts(x?)$/, include: /ClientApp/, exclude: /node_modules/, loader: 'ts-loader?silent' },*/
            { test: /\.css$/, loader: extractCSS.extract(['css-loader']) },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    entry: {
        main: ['./ClientApp/boot-client.tsx'],
        vendor: [
            'react',
            'react-dom',
            'classnames',
            'react-select',
            'react-select/dist/react-select.css'
        ]
    },
    output: {
        path: path.join(__dirname, 'wwwroot', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    plugins: [
        extractCSS,
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js') // Moves vendor content out of other bundles
    ]
};
var serverBundleConfig  = {
    target: 'node',
    devtool: 'inline-source-map',
    resolve: {
        extensions: [ '', '.js', '.jsx', '.ts', '.tsx' ]
    },
    module: {
        loaders: [
            { test: /\.tsx$/, include: /ClientApp/, loader: 'babel-loader' }
        ]
    },
    entry: {
        'boot-server': path.join(__dirname, 'ClientApp', 'boot-server.tsx')
    },
    output: {
        path: path.join(__dirname, 'ClientApp', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/', 
        libraryTarget: 'commonjs'
    },
    plugins: [] // Don't bundle .js files from node_modules
};

module.exports = [clientBundleConfig, serverBundleConfig];