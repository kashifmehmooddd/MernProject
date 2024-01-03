const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { followOrUnfollow } = require('../../controllers/followers_controller');
const { check } = require('express-validator');

router.post(
  '/',
  [auth, [check('following_id', 'Following id is required!').not().isEmpty()]],
  followOrUnfollow
);

module.exports = router;
