var express = require('express');
var validator = require('validator');

const mongodbClient = require('../_helpers/db');
const { ObjectId } = require("mongodb");
require('dotenv').config()

var router = express.Router();
router.all('*', async function (req, res, next) {

  // check user is login 
  console.log('req.session>>>', req.session)
  if (validator.isEmail(req?.session?.auth?.email)) {
    next()
  } else {
    return res.redirect(`${process.env.ROOT_DOMAIN}://auth.${process.env.ROOT_DOMAIN}`)
  }
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('<h1>User<h1>')
});

router.get('/myaccounts', async function (req, res, next) {
  console.log(req.session.auth)
  var _agent = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('agent').findOne({ _id: (req.session.auth._id) });
  console.log('_agent', _agent)
  if (_agent != null) {

  } else {

  }
  res.send('<h1>User<h1>')
});

module.exports = router;
