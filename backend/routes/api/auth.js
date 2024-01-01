const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (user) {
      res.send({user});
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

module.exports = router;
