var express = require('express');
var router = express.Router();


//var rApi = require('./api/');
//var rAdmin = require('./admin/');
var rAuth = require('./auth');
var rInterface = require('./interface/');


//router.use('/admin/', rAdmin)// develop in the future
//router.use('/api/', rApi)
//router.use('/myaccounts', rPages)
router.use('/auth', rAuth)
router.use('/', rInterface)

module.exports = router;
