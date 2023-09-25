const { ObjectId } = require("mongodb");
const mongodbClient = require('./db');
const path = require('path');

module.exports = {
    load_interface: async (req, res, next) => {
        //console.log(req.query)
        var processing = { status: 'ok' };
        if (req?.params?.interface) {
            try {
                var _interface = await mongodbClient.db('Airlink').collection('interface').findOne({ '_id': new ObjectId(req?.params?.interface) }, { path: 1, static_var: 1, default_fun: 1 });
                console.log('_interface >> ', _interface)
                if (_interface != null) {
                    var prog_path = path.join(__dirname, '../interface/', _interface.path);
                    var program = require(prog_path);
                    var action = req.params?.fun || _interface?.default_fun || "index";
                    return program[action](req, res, next);
                } else {
                    processing = { status: 'Not Ok', msg: 'Interface not found' }
                }
            } catch (e) {
                processing = { status: 'Not Ok', msg: `Wrong interface value ${e}` }
            }
        } else {
            processing = { status: 'Not Ok', msg: 'Interface not define' }
        }
        return res.json(processing);
    }
}