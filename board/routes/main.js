const router = require('express').Router();

const loginChecker = require('../lib/loginChecker'); 

const lang = require('../lib/lang/ko.json'); 

router.get('/', (req, res, next) => {
  res.render('home/welcome', {
      title     : lang.main_title, 
      user: req.user,
      loginError: req.flash('loginError'),
  });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

module.exports = router;