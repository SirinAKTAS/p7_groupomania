const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.middleware');
const postCtrl = require('../controllers/post.controller');

// Post
router.get('/', postCtrl.readPost);
router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);
router.patch('/like/:id', postCtrl.likePost);
router.patch('/unlike/:id', postCtrl.unlikePost);

// Comment on Post
router.patch('/comment-post/:id', postCtrl.commentPost);
router.patch('/edit-comment-post/:id', postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', postCtrl.deleteCommentPost);

module.exports = router;