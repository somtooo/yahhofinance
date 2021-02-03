const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');


const connectionURL =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017';
const databaseName = 'stock-data-tracker';
const data = {connectionURL,databaseName}

async function connectAndOperateOnDb(arr,operation,portfolio) {
  const client = new MongoClient(connectionURL);

  try {
    await client.connect();
    await operation(arr, client.db(databaseName),portfolio);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}



function downloadCSV(portfolio) {
  MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;

      client
        .db('stock-data-tracker')
        .collection(portfolio)
        .find({})
        .toArray((err, data) => {
          if (err) throw err;

          // console.log(data);
          const json2csvParser = new Json2csvParser({ header: true });
          const csvData = json2csvParser.parse(data);

          fs.writeFileSync('./CSV/'+portfolio+'.csv', csvData, function (error) {
            if (error) throw error;
            console.log('Write to latest.csv successfully!');
          });

          client.close();
        });
    }
  );
}

module.exports = { connectAndOperateOnDb, downloadCSV, data, downloadCSV };
