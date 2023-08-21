const express = require('express')
const router = express.Router();
const Profile = require("../../models/Profile")
const auth = require("../../middleware/auth")
const {
  currentProfile,
  createOrUpdate,
} = require('../../controllers/profiles_controller');
const {
  check
} = require('express-validator');


router.get('/me', auth, currentProfile);
router.post('/', [auth, [
  check('status', 'Status is required!').not().isEmpty(),
  check('skills', 'Skills are required!').not().isEmpty(),
]], createOrUpdate)

module.exports = router;
