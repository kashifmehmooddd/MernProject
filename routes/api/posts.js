const express = require('express');
const {
  check
} = require('express-validator');
const {
  create,
  index,
  remove,
  addComment,
  removeComment,
  addLike,
  removeLike
} = require('../../controllers/posts_controller');
const router = express.Router();
const auth = require('../../middleware/auth')

router.get('/', auth, index);
router.delete('/:id', auth, remove)
router.post('/', [auth, [
  check('text', "description of the post is required!").not().isEmpty()
]], create);
router.put('/:id/comment', [auth, [
  check('text', 'Description is required for the comment!').not().isEmpty()
]], addComment);
router.delete('/:id/comment/:comment_id', auth, removeComment);
router.put('/:id/like', auth, addLike);
router.delete('/:id/like/:like_id', auth, removeLike);

module.exports = router;
