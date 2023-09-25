var express = require('express');
var router = express.Router();

router.all('*', async function (req, res, next) {

  // check user is login 
  console.log('req.session>>>', req.session)
  if (validator.isEmail(req?.session?.auth?.email)) {
    next()
  } else {
    return res.redirect(`${process.env.PROTOCOL}://${process.env.ROOT_DOMAIN}:${process.env._DEVPORT}`)
  }
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>App<h1>')
});

module.exports = router;
