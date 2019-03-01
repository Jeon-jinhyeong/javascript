const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares'); //추가

const router = express.Router();

//자신의 프로필은 로그인을 해야 볼 수 있으므로 isLoggedIn 미들웨어 사용
//req.isAuthenticated()가 ture여야 next()가 호출되어 res.render가 있는 미들웨어로 넘어
//갈수 있다. false면 메인 페이지로 리다이렉트 된다.
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird', user: req.user });
});

//회원가입 페이지는 로그인을 하지 않은 사람에게만 보여야 한다.
//isNotLoggedIn 미들웨어로 req.isAuthenticated()가 false일 때만 next()를 호출
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('home/join', {
        title: '회원가입 - NodeBird',
        user: null,
        joinError: req.flash('joinError'),
    });
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('home/login', {
        title: '로그인 - NodeBird',
        user: null,
        joinError: req.flash('joinError'),
    });
});

router.get('/', (req, res, next) => {
    res.render('home/welcome', {
        title: 'NodeBird',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

module.exports = router;