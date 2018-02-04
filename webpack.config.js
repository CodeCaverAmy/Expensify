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
            path: path.join(__dirname, 'public', 'dist'), // absolute path on machine to where it lives
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
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        // source map for WebPack to help with debugging (source-map depends on development or production)
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true, //tell dev server that we will handle routing on client-side
            publicPath: '/dist/'
        }
    };
};
