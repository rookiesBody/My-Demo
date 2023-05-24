var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var LoginRouter = require('./routes/login');
var apiRouter = require('./routes/api');
var uploadRouter = require('./routes/upload');
var chatRouter = require('./routes/chat');
var JWT = require('./utils/JWT')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); //打印日志信息
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //设置cookie
app.use(express.static(path.join(__dirname, 'public'))); //静态资源目录

//设置中间件，token过期校验
app.use((req, res, next) => {
  if (req.url.includes("login")) {
    next()
    return //终止后续代码执行
  }
  const token = req.headers["authorization"]?.split(" ")[1]
  if (token) {
    const payload = JWT.verify(token)

    //payload存在表示解密成功
    if (payload) {
      //更新token
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username,
      }, '1h')
      res.header("Authorization", newToken)
      next()
    } else {
      res.status(401).send({errCode: -1, errInfo: "token过期~"})
    }
  } else {
    next()
  }
})

app.use('/login', LoginRouter);
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/upload', uploadRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
