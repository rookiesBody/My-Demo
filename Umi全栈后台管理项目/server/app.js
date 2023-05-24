var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/admin/UserRouter');
var newsRouter = require('./routes/admin/NewsRouter');
var productRouter = require('./routes/admin/ProductRouter');
var EventsRouter = require('./routes/EventsRouter');
const JWT = require('./utils/JWT');

var app = express();

// 引入跨域插件
 const cors = require('cors'); 
 // 解决跨域
 app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置中间件，token过期校验
// app.use((req, res, next) => {
//   if (req.url.includes("login")) {
//     next()
//     return //终止后续代码执行
//   }
//   const token = req.headers["authorization"]?.split(" ")[1]
//   if (String(token)) {
//     const payload = JWT.verify(token)

//     //payload存在表示解密成功
//     if (payload) {
//       //更新token
//       const newToken = JWT.generate({
//         _id: payload._id,
//         // username: payload.username,
//       }, '1h')
//       req.aaa = newToken
//       res.header("Authorization", newToken)
//       next()
//     } else {
//       res.status(401).send({errCode: -1, errInfo: "token过期~"})
//     }
//   } else {
//     next()
//   }
// })

app.use('/adminapi', usersRouter);
app.use('/newsapi', newsRouter);
app.use('/proapi', productRouter);
app.use('/', EventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
