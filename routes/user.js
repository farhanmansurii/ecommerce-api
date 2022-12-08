const router = require('express').Router();
const User = require('../models/User');
const { verifyToken, verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');

router.put('/:id', verifyTokenAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json('error');
  }
});

router.delete('/:id', verifyTokenAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('user deleted');
  } catch (error) {
    res.status(500).json('error');
  }
});
router.get('/find/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json('error');
  }
});
router.get('/', async (req, res) => {
  const query = req.query.new;
  try {
    const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json('error');
  }
});
module.exports = router;
