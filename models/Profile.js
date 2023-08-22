const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bio: {
    type: String,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  skills: {
    type: [String],
    required: true
  },
  githubusername: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true
    }
  }],
  education: [{
    school: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    fieldofstudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true
    }
  }],
  socials: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    }
  }
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
