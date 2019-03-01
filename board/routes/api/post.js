const rootPath = "../..";
const router = require('express').Router();
const { Post } = require(`${rootPath}/models`);


// 게시물 등록 - /post
router.post("/", (req, res) => {
  Post.create(req.body, (err, post) => {
   if(err) return res.json(err);
 
   res.redirect("post");
  });
 });

 // 게시물 수정 - /post/:id
router.put("/:id", (req, res) => {
  req.body.updatedAt = Date.now();
 
  Post.findOneAndUpdate({_id : req.params.id}, req.body, (err, post) => {
   if(err) return res.json(err);
 
   res.redirect("/post/" + req.params.id);
  });
 });
 
 // 게시물 삭제 - /post/:id
 router.delete("/:id", (req, res) => {
  Post.remove({_id : req.params.id}, (err) => {
   if(err) return res.json(err);
 
   res.redirect("/post");
  });
 });

 module.exports = router;