const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'stock-data-tracker';

async function connectAndOperateOnDb(arr, operation) {
  const client = new MongoClient(connectionURL);

  try {
    await client.connect();
    await operation(arr, client.db(databaseName));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

module.exports = { connectAndOperateOnDb };
