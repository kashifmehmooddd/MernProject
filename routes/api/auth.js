const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const {
  check,
  validationResult
} = require('express-validator');
const config = require("config")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({
        errors: [{
          msg: "User not found!"
        }]
      })
    }

  } catch (err) {
    return res.status(500).json({
      errors: [{
        msg: 'server error'
      }]
    });
  }
});

router.post('/', [
  check('email', 'Please enter a valid email!').isEmail().normalizeEmail(),
  check('password', 'please Enter password with 6 or more characters').exists()
], async (req, res) => {
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
        errors: [{
          msg: 'Invalid Credentials!'
        }]
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        errors: [{
          msg: 'Invalid Credentials!'
        }]
      })
    }

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
