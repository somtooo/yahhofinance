const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

let data;
const connectionURL =
  process.env.MONGODB_URI ||
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

function downloadCSV() {
  MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;

      client
        .db('stock-data-tracker')
        .collection('Stock Data')
        .find({})
        .toArray((err, data) => {
          if (err) throw err;

          // console.log(data);
          const json2csvParser = new Json2csvParser({ header: true });
          const csvData = json2csvParser.parse(data);

          fs.writeFileSync('./CSV/latest.csv', csvData, function (error) {
            if (error) throw error;
            console.log('Write to latest.csv successfully!');
          });

          client.close();
        });
    }
  );
}

module.exports = { connectAndOperateOnDb, downloadCSV };
