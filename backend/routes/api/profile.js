const express = require('express')
const router = express.Router();
const Profile = require("../../models/Profile")
const auth = require("../../middleware/auth")
const {
  currentProfile,
  createOrUpdate,
  index,
  show,
  remove,
  addExperience,
  removeExperience,
  addEducation,
  removeEducation,
  githubRepos,
} = require('../../controllers/profiles_controller');
const {
  check
} = require('express-validator');

router.get('/', index);
router.get('/users/:user_id', show);
router.delete('/users/:user_id', remove);
router.get('/me', auth, currentProfile);
router.post('/', [auth, [
  check('status', 'Status is required!').not().isEmpty(),
  check('skills', 'Skills are required!').not().isEmpty(),
]], createOrUpdate);
router.put('/experience', [auth, [
  check('title', 'Title is required!').not().isEmpty(),
  check('company', 'Company is required!').not().isEmpty(),
  check('from', 'From date is required!').not().isEmpty(),
  check('description', 'Description is required!').not().isEmpty()
]], addExperience);
router.delete('/experience/:exp_id', auth, removeExperience);
router.put('/education', [auth, [
  check('school', 'School is required!').not().isEmpty(),
  check('fieldofstudy', 'Field of study is required!').not().isEmpty(),
  check('from', 'From date is required!').not().isEmpty(),
  check('description', 'Description is required!').not().isEmpty()
]], addEducation);
router.delete('/education/:edu_id', auth, removeEducation);
router.get('/github/:username', githubRepos);

module.exports = router;
