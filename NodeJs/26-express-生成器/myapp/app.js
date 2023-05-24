var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')
var MongoStore = require('connect-mongo')

var indexRouter = require('./routes/index');
var LoginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); //打印日志信息
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //设置cookie
app.use(express.static(path.join(__dirname, 'public'))); //静态资源目录

// 注册session中间件
app.use(session({
  name: "zhangyi24",
  secret: "asdzxc123456", //秘钥
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, //过期时间
    secure: false, //为true表示只有https协议才能访问cookie
  },
  resave: true, //重新设置session后，重新计时
  saveUninitialized: true, //初始是否设置cookie
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/zhangsan_session', //新创建一个数据库
    ttl: 1000 * 60 * 10 * 24, //过期时间
  })
}))

//设置中间件，session过期校验
app.use((req, res, next) => {
  if (req.url.includes("login")) {
    next()
    return //终止后续代码执行
  }
  if (req.session.user) {
    // 重新设置一下session
    req.session.myDate = Date.now()
    next()
  } else {
    /**
     * 是接口 返回错误码
     * 不是接口 重定向
     */
    req.url.includes("api")
      ? res.status(401).send({ status: 0 }) : res.redirect("login")
  }
})

app.use('/login', LoginRouter);
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
