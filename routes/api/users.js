const express = require('express')
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');

router.post('/', [
  check('email', 'Please enter a valid email!').isEmail().normalizeEmail(),
  check('name', 'name is required please enter the email').not().isEmpty().trim().escape(),
  check('password', 'please Enter password with 6 or more characters').isLength({
    min: 8
  })
], (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  res.send("users route")
});

module.exports = router;
