// Express 관련
const express = require('express'),
      app = express();

// Cookie & Session
const cookieParser = require('cookie-parser'),
      session = require('express-session');

// 설정 관련
const config = require(__dirname + '/config/config.json');
      
// Lib
const path = require('path'),
      logger = require('morgan'),
      flash = require('connect-flash'), // 메시지를 1회용으로 띄어줄때?
      passport = require('passport');

// Route 관련
const pageRouter = require('./routes'),
      apiRouter = require('./routes/api');

// DB 관련      
const { sequelize } = require('./models');

const passportconifg = require('./lib/passportManager');
sequelize.sync(); // DB가 있으면 만들고 DB가 없으면 새로만듬?
passportconifg(passport); 

// view engine 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// PORT 설정
app.set('port', config.PORT || 3000);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); // ?
app.use(express.json()); // ?
app.use(cookieParser(config.COOKIE_SECRET)); 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash()); // ?
app.use(passport.initialize()); // ?
app.use(passport.session()); // ?

// pre-setting : ?
// route보다는 앞에 선언되어야 함
app.use((req, res, next) => {  
  res.locals.isAuthenticated = req.isAuthenticated(); // ?
  res.locals.currentUser = req.user;
  next();
 });

app.use('/', pageRouter);
app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번으로 서버 대기 중');
});
