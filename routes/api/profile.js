const express = require('express')
const router = express.Router();
const Profile = require("../../models/Profile")
const auth = require("../../middleware/auth")
const {
  currentProfile
} = require('../../controllers/profiles_controller')

router.get('/me', auth, currentProfile);

module.exports = router;
