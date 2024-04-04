var express = require('express');
const mongodbClient = require('../_helpers/db');
const { ObjectId } = require("mongodb");


var router = express.Router();
const apiAuth = async function (req, res, next) {
    const apiData = req.body
    console.log('apiData', apiData)
    if (apiData) {
        req.apiAuth = { agency: apiData.agency, pnr: apiData.pnr, auth: true }
    }
    next()
}
router.all('*', [apiAuth], async function (req, res, next) {
    next()
})




/* GET home page. */
router.post('/', async function (req, res, next) {
    var _d = {}
    if (req.apiAuth?.auth) {

        const pnr_details = await mongodbClient.db('Airlink').collection('pnrs').findOne(
            { agency: new ObjectId(req.apiAuth?.agency), pnr: req.apiAuth?.pnr }, {projection:{ _id: 0, "provider": 1, "pnr": 1, "OR_json.Envelope.Body": 1 }})
        _d = pnr_details
    } else {
        _d = { success: false, message: 'Not Authrised' }
    }
    res.json(_d)
    
});

router.post('/', async function (req, res, next) {
    res.json({ message: 'Nothing to process' })
})

module.exports = router;
