const express = require('express')
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');

const {
  login
} = require('../../controllers/users_controller')

router.post('/', [
  check('email', 'Please enter a valid email!').isEmail().normalizeEmail(),
  check('name', 'name is required please enter the email').not().isEmpty().trim().escape(),
  check('password', 'please Enter password 2with 6 or more characters').isLength({
    min: 8
  })
], login);

module.exports = router;
