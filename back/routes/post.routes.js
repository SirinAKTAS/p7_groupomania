const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middleware");
const postCtrl = require("../controllers/post.controller");

// Post
router.get("/", postCtrl.readPost);
router.post("/", multer, postCtrl.createPost);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", multer, postCtrl.deletePost);
router.patch("/like/:id", postCtrl.likePost);
router.patch("/unlike/:id", postCtrl.unlikePost);

module.exports = router;
