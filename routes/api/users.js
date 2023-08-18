const express = require('express')
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require("config")
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

router.post('/', [
  check('email', 'Please enter a valid email!').isEmail().normalizeEmail(),
  check('name', 'name is required please enter the email').not().isEmpty().trim().escape(),
  check('password', 'please Enter password with 6 or more characters').isLength({
    min: 8
  })
], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    name,
    email,
    password
  } = req.body

  try {
    // already exists check
    let user = await User.findOne({
      email
    })
    if (user) {
      return res.status(400).json({
        message: 'user already exists!'
      })
    }

    //avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    // initializing User
    user = new User({
      name,
      email,
      password,
      avatar
    })

    //encryption password
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(password, salt)

    //registeration
    await user.save();

    const payload = {
      user: user.id
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.send({
        token
      });
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'server Error'
    })
  }
});

module.exports = router;
