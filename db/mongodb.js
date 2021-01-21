const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL =
  'mongodb+srv://beatalltech:messi.360@cluster0.5iqzy.mongodb.net/stock-data?retryWrites=true&w=majority';
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
