const bcrypt = require('bcryptjs');
const config = require("config")
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {
  validationResult
} = require('express-validator');

const create = async (req, res) => {
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
        msg: 'user already exists!'
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
        token,
        user
      });
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'server Error'
    })
  }
}

const login = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }



  const {
    email,
    password
  } = req.body

  try {
    // already exists check
    let user = await User.findOne({
      email
    })

    if (!user) {
      return res.status(400).json({
          msg: 'Invalid Credentials!'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
          msg: 'Invalid Credentials!'
      })
    }

    const payload = {
      user: user.id
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      delete user.password;
      res.send({
        token,
        user
      });
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'server Error'
    })
  }
}

module.exports = {
  create,
  login
}
