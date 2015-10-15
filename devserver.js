var express = require('express');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var proxy = require('proxy-middleware');
var url = require('url');

var webpackConf = require('./webpack.config.js');
var app = express();

app.use('/', proxy(url.parse('http://localhost:3001/dist')));
app.get('/*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});
app.listen(3000);

new webpackDevServer(webpack(webpackConf), {
    contentBase: __dirname,
    publicPath: webpackConf.output.publicPath,
    hot: true
}).listen(3001, 'localhost', function(err){
    if(err){
        console.log(err);
    }
});