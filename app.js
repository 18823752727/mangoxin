var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// morgan是express默认的日志中间件
var logger = require('morgan');
// 中间件用于获取web浏览器发送的cookie中的内容。
var cookieParser = require('cookie-parser');
// bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理
var bodyParser = require('body-parser');

// 路由
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 安装视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 设置favicon的位置
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 使用中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由
app.use('/', index);
app.use('/users', users);

// 捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 处理错误信息
app.use(function(err, req, res, next) {
  // 设置本地，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
