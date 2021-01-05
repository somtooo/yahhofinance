const mongodb = require('mongodb');

const yahooFinanceDataV10 = require("../financeData/yahooFinanceDataV10");
fs = require('fs')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'stock-data-tracker'

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
  if(error){
    return console.log(error)
  }

  const db = client.db(databaseName)
//   yahooFinanceDataV10.price("AAPL", function (err, data) {
//     if (!err) 
//     {
//       writeKeyToFile(data)
//        db.collection('Stock Data').insertOne(data)
//     }
//     else {
//         console.log(err)
//     }
// });
//   yahooFinanceDataV10.defaultKeyStatistics("AAPL", (err,data)=>{
//     if(!err){
//       writeKeyToFile(data,"keyData2.txt")
//       db.collection('Stock Stats').insertOne(data)
//     }
//     else{
//       console.log(err)
//     }
//   })

 
// })

// yahooFinanceDataV10.summaryDetail("AAPL", (err,data)=>{
//   if(!err){
//     writeKeyToFile(data,"keyData3.txt")
//     db.collection('Stock Summary').insertOne(data)
//   }
//   else{
//     console.log(err)
//   }
// })

yahooFinanceDataV10.financialData("AAPL", (err,data)=>{
  if(!err){
    writeKeyToFile(data,"keyData4.txt")
    db.collection('Stock Financials').insertOne(data)
  }
  else{
    console.log(err)
  }
})


})




function writeKeyToFile(data,filename) {
  let strArray = []; //new Array
    for ( prop in data) {
        strArray.push(prop);
    }
    const keyTowrite =  strArray.join("\n");
    fs.writeFile(filename,keyTowrite,(err)=>{
      if(err) return console.log(err)
    })

  
}