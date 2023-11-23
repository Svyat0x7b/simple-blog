const { MongoClient } = require('mongodb');

export async function connectDatabase() {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const client = await new MongoClient(
        `mongodb+srv://${username}:${password}@cluster0.zqs6bww.mongodb.net/?retryWrites=true&w=majority`,
    ).connect();

    return client;
}

export async function insertDocument(client, document, collection) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getDocuments(client, collection) {
    const db = client.db();
    const documents = await db.collection(collection).find().sort({ _id: -1 }).toArray();
    console.log(documents);
    return documents;
}
