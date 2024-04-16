const { ObjectId } = require("mongodb");
const mongodbClient = require('./db');
const path = require('path');
const { html_doc } = require('../interface/_components/html_doc')
require('dotenv').config()

module.exports = {
    load_interface: async (req, res, next) => {
        //console.log(req.query)
        var processing = { status: 'ok' };
        if (req?.params?.interface) {
            try {  

                
                var _interface = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('interface').findOne({ '_id': new ObjectId(req?.params?.interface) }, { path: 1, static_var: 1, default_fun: 1, access_labels: 1 });
                console.log('_interface >> ', _interface)
                if (_interface != null) {

                    // Loading user access access 
                    const access = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('user_access').findOne({ interface_id: new ObjectId(_interface._id), user_id: new ObjectId(req.session.auth._id) })
                    req.access = access?.access || []
                    console.log("req.access", req.access)
                    
                    var prog_path = path.join(__dirname, '../interface/', _interface.path);
                    var program = require(prog_path);
                    console.log('prog_path', prog_path)
                    var action = req.params?.fun || _interface?.default_fun || "index";
                    return program[action](req, res, next);
                } else {
                    processing = { status: 'Not Ok', msg: 'Interface not found' }
                }
            } catch (e) {
                const _content = `
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