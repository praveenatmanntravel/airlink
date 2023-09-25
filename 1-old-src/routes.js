var express = require('express');
var router = express.Router();

var rAuth = require('./auth');
var rUser = require('./user/');
var rAgent = require('./agent/');
var rAdmin = require('./admin/');
var rWebsite = require('./website/');

router.use('/auth', rAuth)
router.use('/user', rUser)
router.use('/agent', rAgent)
router.use('/admin', rAdmin)
router.use('/', rWebsite)

module.exports = router;
