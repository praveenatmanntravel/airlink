const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()

const connectionString = `mongodb+srv://${encodeURIComponent(process.env.MONGO_DB_USER)}:${encodeURIComponent(process.env.MONGO_DB_PASSWORD)}@${process.env.MONGO_DB_SERVER}/?authMechanism=DEFAULT`;
const mongodbClient = new MongoClient(connectionString, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

module.exports = mongodbClient;