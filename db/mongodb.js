const { get } = require('http');
const mongodb = require('mongodb');
const { resolve } = require('path');
const schedule = require('node-schedule');

const yahooFinanceDataV10 = require('../financeData/yahooFinanceDataV10');
fs = require('fs');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'stock-data-tracker';
let db;

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(error);
    }

    db = client.db(databaseName);

    // buildAndPopulateDatabase(['AAPL', 'MSFT', 'JNJ', 'AMZN']);
  }
);

// schedule.scheduleJob({ hour: 15, minute: 35, dayOfWeek: 6 }, function () {
//   updateDb(['AAPL', 'MSFT', 'JNJ', 'AMZN']);
// });

async function updateDb(arr) {
  let updatePromise;
  for (x of arr) {
    updatePromise = db.collection('Stock Data').updateOne(
      {
        ticker: x,
      },
      {
        $set: await getDataPromise(x),
      }
    );
    updatePromise
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function buildAndPopulateDatabase(arr) {
  let finalarr = [];

  for (x of arr) {
    db.collection('Stock Data').insertOne(
      await getDataPromise(x),
      (err, result) => {
        if (err) {
          return console.log(err);
        }
        console.log(result.ops);
      }
    );
  }
}

function getDataPromise(ticker) {
  return new Promise((resolve) => {
    getData(ticker, (finalObject) => {
      resolve(finalObject);
    });
  });
}

function getData(ticker, callback) {
  let data0, firstObject, secondObject, finalObject;
  // let combinedarr = [];
  let data1 = { ticker };
  yahooFinanceDataV10.financialData(ticker, (err, data) => {
    if (!err) {
      data0 = Object.assign(data1, data);
      yahooFinanceDataV10.price(ticker, function (err, data) {
        if (!err) {
          firstObject = Object.assign(data0, data);
          yahooFinanceDataV10.summaryDetail(ticker, (err, data) => {
            if (!err) {
              secondObject = Object.assign(firstObject, data);
              yahooFinanceDataV10.defaultKeyStatistics(ticker, (err, data) => {
                if (!err) {
                  finalObject = Object.assign(secondObject, data);
                  // combinedarr.push(finalObject);
                  callback(finalObject);
                } else {
                  console.log(err);
                }
              });
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}
