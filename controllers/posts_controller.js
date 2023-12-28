const { validationResult } = require('express-validator');
const Post = require('../models/Post');
const User = require('../models/User');

const index = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const remove = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [
          {
            msg: 'Post not found!',
          },
        ],
      });

    if (post.user != req.user)
      return res.status(400).json({
        errors: [
          {
            msg: 'You are not authorized to delete this post!',
          },
        ],
      });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: 'Post has been deleted!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};

const create = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { text } = req.body;
    const user = await User.findById(req.user).select('-password');
    const postfields = {
      text,
      user: user._id,
      name: user.name,
      avatar: user.avatar,
    };

    const post = new Post(postfields);
    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const addComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { text } = req.body;
    const user = await User.findById(req.user).select('-password');
    const comment = {
      text,
      user: user._id,
      name: user.name,
      avatar: user.avatar,
    };
    let post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [
          {
            msg: 'Post not found!',
          },
        ],
      });

    post.comments.unshift(comment);

    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const removeComment = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [
          {
            msg: 'Post not found!',
          },
        ],
      });

    const temp = post.comments.find((c) => c._id == req.params.comment_id);

    if (!temp)
      return res.status(400).json({
        errors: [
          {
            msg: 'Comment not found!',
          },
        ],
      });

    if (temp.user != req.user)
      res.status(400).json({
        errors: [
          {
            msg: 'You can only delete your comment!',
          },
        ],
      });

    post.comments = post.comments.filter((c) => c._id != req.params.comment_id);

    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const addLike = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [
          {
            msg: 'Post not found!',
          },
        ],
      });

    if (post.likes.some((l) => l.user == req.user))
      return res.status(400).json({
        errors: [
          {
            msg: 'You have already liked this post!',
          },
        ],
      });

    const user = await User.findById(req.user).select('-password');

    const like = {
      user: user._id,
      name: user.name,
      avatar: user.avatar,
    };

    post.likes.unshift(like);

    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const removeLike = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post)
      return res.status(400).json({
        errors: [
          {
            msg: 'Post not found!',
          },
        ],
      });

    const temp = post.likes.find((l) => l.user == req.user);
    console.log(temp);

    if (!temp)
      return res.status(400).json({
        errors: [
          {
            msg: 'You didnt like this Post!',
          },
        ],
      });

    if (temp.user != req.user)
      return res.status(400).json({
        errors: [
          {
            msg: 'You can only remove your like!',
          },
        ],
      });

    post.likes = post.likes.filter((c) => c.user != req.user);

    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  index,
  create,
  remove,
  addComment,
  removeComment,
  addLike,
  removeLike,
};
