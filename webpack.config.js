const path = require('path'); // built in node function
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    // test to see if the build is for production
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    console.log('env', env);
    return {
        entry: './src/app.js', // tell webpack where to start
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
                use: CSSExtract.extract({
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        // source map for WebPack to help with debugging (if build is for development and not production)
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true //tell dev server that we will handle routing on client-sidte
        }
    };
};
