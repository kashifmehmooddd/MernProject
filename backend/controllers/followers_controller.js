const { validationResult } = require('express-validator');
const Follower = require('../models/Follower');

const followOrUnfollow = async (req, res) => {
  errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { following_id } = req.body;

  try {
    const followerFields = {
      follower_id: req.user,
      following_id,
    };

    let follower = await Follower.findOne(followerFields);

    if (follower !== null) {
      await follower.deleteOne()
      return res.status(200).json({
        errors: [
          {
            msg: 'You have unfollowed this user',
          },
        ],
      });
    }

    follower = new Follower(followerFields);
    await follower.save();
    return res.status(200).json(follower);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: 'Server Error!',
    });
  }
};

module.exports = { followOrUnfollow };
