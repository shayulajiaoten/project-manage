var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var homeRouter = require('./routes/home')
var userRouter = require('./routes/user');
var projectRouter = require('./routes/project')
var membersRouter = require('./routes/members')
var templateRouter = require('./routes/template')
var taskRouter = require('./routes/task')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'WJiol#23123_',
  cookie: {
    // path: '/',   // 默认配置
    // httpOnly: true,  // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}))

app.use('/api/user', userRouter)
app.use('/api/home', homeRouter)
app.use('/api/members', membersRouter)
app.use('/api/project', projectRouter)
app.use('/api/template', templateRouter)
app.use('/api/task', taskRouter)
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