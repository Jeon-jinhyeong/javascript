const rootPath = "..";
const router = require('express').Router();

const passport = require('passport'),
      bcrypt = require('bcrypt'),
      loginChecker = require(`${rootPath}/lib/loginChecker`);

const lang = require(`${rootPath}/lib/lang/ko.json`);


// 자신의 프로필은 로그인을 해야 볼 수 있으므로 loginChecker.isLoggedIn 미들웨어 사용
// isLoggedIn()가 ture여야 next()가 호출되어 res.render가 있는 미들웨어로 넘어갈수 있으며,
// false면 메인 페이지로 이동한다.
router.get('/profile', loginChecker.isLoggedIn, (req, res) => {
  res.render('profile', { 
    title   : lang.profile_title, 
    user    : req.user 
  });
});

// 회원가입 페이지는 로그인을 하지 않은 사람에게만 보여야 함으로 loginChecker.isNotLoggedIn 미들웨어로 사용
// isNotLoggedIn()가 ture여야 next()가 호출되어 res.render가 있는 미들웨어로 넘어갈수 있으며,
// false면 메인 페이지로 이동한다.
router.get('/join', loginChecker.isNotLoggedIn, (req, res) => {
  res.render('home/join', {
    title    : lang.join_title, 
    user     : null,
    joinError: req.flash('joinError'),
  });
});

router.get('/login', loginChecker.isNotLoggedIn, (req, res) => {
  res.render('home/login', {
    title     : lang.login_title, 
    user      : null,
    joinError : req.flash('joinError'),
  });
});

router.get('/logout', loginChecker.isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;