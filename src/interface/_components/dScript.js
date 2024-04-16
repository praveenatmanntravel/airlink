const mongodbClient = require('../../_helpers/db');
const { ObjectId } = require("mongodb");
require('dotenv').config()

module.exports = {
    run: async (req, res, next) => {
        var s = {}

        // fetch users
        const users = await mongodbClient.db(process.env.MONGO_DB_NAME).collection('users').find({ agency: new ObjectId(req.session.agency._id) }, { email: 1, name: 1 }).toArray();
        s.users = users
        return JSON.stringify(s)
    },
    post: ()=>{},
    put: ()=>{},
}