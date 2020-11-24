// Use ES6 Imports for mongodb and our mongo client
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;
require('dotenv').config()

let dbName = "_golfCourses";
// connection string
const uri = "mongodb+srv://thisisatest:process.env.MONGO_PASS@cluster0.lsfrb.mongodb.net/_golfCourses?retryWrites=true&w=majority";
const getCollectionDocuments = async (collectionName) => {
    // Connect to our database / open our connection
    try{
        const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
    // Close our connection
    mongo.close();
    return dataCollection;
    } catch(e) {
        console.log(e)
        return []
    }
}
const createCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Create our document
    if (!data._id) {
        data._id = new mongodb.ObjectID().toString();
        await mongo.db(dbName).collection(collectionName).insertOne(data)
    } else {
        updateCollectionDocument(collectionName, data);
    }
    // Close our connection
    mongo.close();
}
const updateCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    var myquery = { _id: new mongodb.ObjectID(data._id) };
    var newvalues = { $set: data };
    await mongo.db(dbName).collection(collectionName).replaceOne(
        { _id : data._id },
        data, 
        { upsert: true} 
    );
    // Close our connection
    mongo.close();
}
const deleteCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    await mongo.db(dbName).collection(collectionName).deleteOne(
        { _id : data._id }
    );
    // Close our connection
    mongo.close();
}

module.exports.getCollectionDocuments = getCollectionDocuments;
module.exports.createCollectionDocument = createCollectionDocument;
module.exports.updateCollectionDocument = updateCollectionDocument;
module.exports.deleteCollectionDocument = deleteCollectionDocument;













