const router = require('express').Router();

const mainRouter = require('./main'),
      userRouter = require('./user'),
      postRouter = require('./post');

router.use('/', mainRouter);
router.use('/user', userRouter);
router.use("/post", postRouter);

module.exports = router;