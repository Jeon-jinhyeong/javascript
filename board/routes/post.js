const router = require("express").Router();


// 게시물 리스트 - /post
router.get("/", (req, res) => {
    const posts = Post.find({});
    res.render("post/index", {posts : posts});
});

// 게시물 등록 페이지 - /post/new
router.get("/new", (req, res) => {
    res.render("post/new");
});

// 게시물 상세 - /post/:id
router.get("/:id", (req, res) => {
 Post.findOne({_id : req.params.id}, (err, post) => {
  if(err) return res.json(err);

  res.render("post/show", {post : post});
 });
});

// 게시물 수정 페이지 - /post/:id/edit
router.get("/:id/edit", (req, res) => {
 Post.findOne({_id : req.params.id}, (err, post) => {
  if(err) return res.json(err);

  res.render("post/edit", {post : post});
 });
});



module.exports = router;