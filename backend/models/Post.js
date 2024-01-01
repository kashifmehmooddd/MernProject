const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
})

module.exports = Post = mongoose.model('Post', postSchema);
