const {
  validationResult
} = require("express-validator")
const request = require("request")
const Profile = require("../models/Profile")

const index = async (req, res) => {

  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const show = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        errors: "There is no profile for this user!"
      })
    }

    res.send(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        errors: "There is no profile for this user!"
      })
    }
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const createOrUpdate = async (req, res) => {
  errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    company,
    website,
    location,
    skills,
    status,
    githubusername,
    bio,
    youtube,
    instagram,
    linkedin,
    twitter
  } = req.body
  const profilefields = {};
  profilefields.user = req.user

  if (company) profilefields.company = company
  if (website) profilefields.website = website
  if (location) profilefields.location = location
  if (githubusername) profilefields.githubusername = githubusername
  if (status) profilefields.status = status
  if (bio) profilefields.bio = bio

  if (skills) {
    profilefields.skills = skills.split(',').map(skill => skill.trim())
  }

  profilefields.socials = {};

  if (youtube) profilefields.socials.youtube = youtube;
  if (instagram) profilefields.socials.instagram = instagram;
  if (linkedin) profilefields.socials.linkedin = linkedin;
  if (twitter) profilefields.socials.twitter = twitter;

  try {
    let profile = await Profile.findOne({
      user: req.user
    })
    if (profile) {
      profile = await Profile.findOneAndUpdate({
        user: req.user
      }, {
        $set: profilefields
      }, {
        new: true
      });

      return res.send(profile);
    }

    profile = new Profile(profilefields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const remove = async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.params.user_id
    });
    await User.findOneAndRemove({
      _id: req.params.user_id
    });

    res.json({
      msg: 'User deleted!'
    });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        errors: "There is no profile for this user!"
      })
    }
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const currentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      res.status(400).json({
        msg: "There's no profile for this user!"
      })
    }

    res.send(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errors: [{
        msg: "server Error!"
      }]
    })
  }
}

const addExperience = async (req, res) => {
  errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    title,
    company,
    location,
    from,
    to,
    description,
    current
  } = req.body

  const experienceFields = {
    title,
    company,
    location,
    from,
    to,
    description,
    current
  };

  try {
    let profile = await Profile.findOne({
      user: req.user
    })

    if (!profile) {
      return res.status(400).json({
        msg: "Your Profile doesn't exist!"
      })
    }
    profile.experience.unshift(experienceFields)
    await profile.save()
    res.send(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        errors: "Profile not found"
      })
    }
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const removeExperience = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user
    })
    let updatedExps = profile.experience.filter(exp => exp._id != req.params.exp_id);
    profile.experience = updatedExps
    await profile.save();
    res.send(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        errors: "Profile not found"
      })
    }
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const addEducation = async (req, res) => {
  errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    school,
    fieldofstudy,
    location,
    from,
    to,
    description,
    current
  } = req.body

  const educationFields = {
    school,
    location,
    fieldofstudy,
    from,
    to,
    description,
    current
  };

  try {
    let profile = await Profile.findOne({
      user: req.user
    })

    if (!profile) {
      return res.status(400).json({
        msg: "Your Profile doesn't exist!"
      })
    }
    profile.education.unshift(educationFields)
    await profile.save()
    res.send(profile);
  } catch (err) {
    console.log(err);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        errors: "Profile not found"
      })
    }
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const removeEducation = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user
    })
    let updatedEdus = profile.education.filter(edu => edu._id != req.params.edu_id);
    profile.education = updatedEdus;
    await profile.save();
    res.send(profile);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        errors: "Profile not found"
      })
    }
    res.status(500).json({
      errors: "Server Error!"
    })
  }
}

const githubRepos = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }
    request(options, (error, response, body) => {
      if (error) console.log(error);

      if (response.statusCode !== 200)
      {
        return res.status(404).json({ msg: "No github profile found!" })
      }

      res.send(JSON.parse(body).map(item => item.clone_url));
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error!" })
  }
}

module.exports = {
  currentProfile,
  createOrUpdate,
  index,
  show,
  remove,
  addExperience,
  removeExperience,
  addEducation,
  removeEducation,
  githubRepos
}
