const { ObjectId } = require("mongodb");
const mongodbClient = require('./db');
require('dotenv').config()

module.exports = {

    convert2Array: (O) => {
        var r = []

        if (O?.hasOwnProperty('length')) {
            O.forEach((o) => r.push(o))
        } else if (O !== undefined) {
            r.push(O)
        }
        
        return r
    },
    ActivityLog_insert: async (log) => {
        await mongodbClient.db(process.env.MONGO_DB_NAME).collection('activity_log').insertOne(log)
    }
}
