const path = require('path'); // built in node function

module.exports = {
    entry: './src/playground/redux-expensify.js', // tell webpack where to start
    output: {
        path: path.join(__dirname, 'public'), // absolute path on machine to where it lives
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            // loader to tell webpack to run babel everytime it sees a JS file we write
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.s?css$/, // support scss and css files
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // source map for WebPack to help with debugging
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true //tell dev server that we will handle routing on client-sidte
    }
};

