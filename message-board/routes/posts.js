const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    Post.find({})
    .sort('-createdAt')
    .exec((err, posts) => {
        if (err) {
            return res.json(err);
        }
        res.render('posts/index', { posts: posts });
    });
});