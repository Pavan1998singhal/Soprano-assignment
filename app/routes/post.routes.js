const upload = require('../helperFunctions/upload');

const router = require('express').Router();

const post = require('../controllers/post.controllers');

router.post('/', post.uploadFiles, post.createPost);

router.get('/', post.getAllPosts);

router.get('/:id', post.getPostById);

router.put('/:id', post.uploadFiles, post.updatePost);

router.delete('/:id', post.deletePost);

module.exports = router;