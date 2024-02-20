const { ObjectId } = require("mongodb");
const mongodbClient = require('./db');
const path = require('path');
const { html_doc } = require('../interface/_components/html_doc')

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
                    console.log('prog_path', prog_path)
                    var action = req.params?.fun || _interface?.default_fun || "index";
                    return program[action](req, res, next);
                } else {
                    processing = { status: 'Not Ok', msg: 'Interface not found' }
                }
            } catch (e) {
                const _content=`
                <h1>404 not found</h1>
                <p>${JSON.stringify(e)}</p>
                `;
                var html = html_doc(req, res, next, _content)
                return res.send(html)
                
                processing = { status: 'Not Ok', msg: `Wrong interface value ${e}` }
            }
        } else {
            processing = { status: 'Not Ok', msg: 'Interface not define' }
        }
        return res.json(processing);
    }
}