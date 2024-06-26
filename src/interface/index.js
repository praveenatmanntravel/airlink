var express = require('express');
const { auth } = require('../_helpers/authorization')
const {load_interface} = require('../_helpers/load_interface')
const mongodbClient = require('../_helpers/db');
const { ObjectId } = require("mongodb");
const { index } = require("./dashboard");
require('dotenv').config()


var router = express.Router();
router.all('*', [auth], async function (req, res, next) {
    next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
    return index(req, res, next);
    console.log(req.params)
    res.send(`
    <h1>Dashboarde</h1>
    <pre>${JSON.stringify(req.session)}</pre>
    `)
});

router.get('/dScript', async function (req, res, next) {
    const dScript = require('./_components/dScript')
    
    const dynamicScript = await dScript.run(req, res, next);

    res.setHeader('Content-Type', 'application/javascript');
    res.send(dynamicScript);
});

router.all('/:interface', [load_interface], function (req, res, next) {
    res.send('something unexpected, please try again or call for suport')
});

router.all('/:interface/:fun', [load_interface], function (req, res, next) {
    res.send('something unexpected, please try again or call for suport')
});

router.get('/myaccounts', async function (req, res, next) {
    //   console.log(req.session.auth)
    //   var _agent = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('agent').findOne({ _id: (req.session.auth._id) });
    //   console.log('_agent', _agent)
    //   if (_agent != null) {

    //   } else {

    //   }
    res.send('<h1>Select Accounts<h1>')
});

module.exports = router;
