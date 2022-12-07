const router = require('express').Router();
router.get('/users', (req, res) => {
  res.send('Hello World!');
});
router.post('/users', (req, res) => {
  const username = req.body.username;
 res.send( "username :" + username)
});

module.exports = router;
