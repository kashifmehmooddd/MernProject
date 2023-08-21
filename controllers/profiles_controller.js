const {
  validationResult
} = require("express-validator")
const Profile = require("../models/Profile")

const currentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      res.status(400).json({
        errors: [{
          msg: "There's no profile for this user!"
        }]
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

module.exports = {
  currentProfile,
  createOrUpdate
}
