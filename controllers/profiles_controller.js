const currentProfile =  async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user
    }).populate('user')

    if (!profile) {
      res.status(400).json({
        errors: [{
          msg: "Profile not found!"
        }]
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: [{ msg: "server Error!" }]})
  }
}

module.exports = { currentProfile }
