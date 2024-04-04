var express = require('express');
const { auth } = require('../_helpers/authorization')
const {load_interface} = require('../_helpers/load_interface')
const mongodbClient = require('../_helpers/db');
const { ObjectId } = require("mongodb");
const { index } = require("./dashboard");


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

router.all('/:interface', [load_interface], function (req, res, next) {
    res.send('something unexpected, please try again or call for suport')
});

router.all('/:interface/:fun', [load_interface], function (req, res, next) {
    res.send('something unexpected, please try again or call for suport')
});

router.get('/myaccounts', async function (req, res, next) {
    //   console.log(req.session.auth)
    //   var _agent = await mongodbClient.db('Airlink').collection('agent').findOne({ _id: (req.session.auth._id) });
    //   console.log('_agent', _agent)
    //   if (_agent != null) {

    //   } else {

    //   }
    res.send('<h1>Select Accounts<h1>')
});

module.exports = router;
