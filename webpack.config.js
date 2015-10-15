var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: ['webpack-dev-server/client?http://localhost:3001', 'webpack/hot/dev-server', "./source/index"],
        plugins: ['react']
    },

    output: {
        path: path.join(__dirname, "/dist/"),
        publicPath: 'http://localhost:3001/dist/',
        filename: "bundle.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('plugins', 'plugins.bundle.js')
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {

        loaders: [
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer-loader?browsers=last 2 version', 'sass']},
            { test: /\.jsx$/, loaders: ['react-hot', 'jsx'] },
            { test: /\.json/, loaders: ['json']}
        ]
    }
};