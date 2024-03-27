const { ObjectId } = require("mongodb");
const mongodbClient = require('./db');

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
        await mongodbClient.db('Airlink').collection('activity_log').insertOne(log)
    }
}
