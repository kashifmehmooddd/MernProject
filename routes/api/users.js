const express = require('express')
const router = express.Router();
const {
  check
} = require('express-validator');

const {
  create,
  login
} = require('../../controllers/users_controller')

router.post('/', [
  check('email', 'Please enter a valid email!').isEmail().normalizeEmail(),
  check('name', 'name is required please enter the email').not().isEmpty().trim().escape(),
  check('password', 'please Enter password 2with 6 or more characters').isLength({
    min: 8
  })
], create);

router.post('/login', [
  check('email', 'Please enter a valid email!').isEmail().normalizeEmail(),
  check('password', 'please Enter password with 6 or more characters').exists()
], login);

module.exports = router;
