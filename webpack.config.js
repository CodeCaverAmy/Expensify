const path = require('path'); // built in node function
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('weback');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.development' });
}

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
            CSSExtract,
            new webpack.DefinePlugin({
                'pocess.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'pocess.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'pocess.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'pocess.env.FIREBASE_PROJECT': JSON.stringify(process.env.FIREBASE_PROJECT),
                'pocess.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'pocess.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
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
