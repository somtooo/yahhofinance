const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./db/mongodb');
const port = process.env.PORT;
const {
  updateDb,
  buildAndPopulateDatabase,
} = require('./db/databaseOperations');
const { rejects } = require('assert');
const { callbackify } = require('util');
const app = express();
const publicDirectoryPath = path.join(__dirname, '/public');
const upload = multer({ dest: 'uploads/' });
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('download/:file', (req, res) => {
  let path = '/home/download' + req.params.file;
  console.log(req.params.file);

  if (!fs.existsSync(req.params.file)) {
    res.status(404).json({ message: 'file not found' });
    return;
  }
  res.download(req.params.file, path);
});

app.post(
  '/stock-names',
  upload.single('stockTickerNames'),
  async (req, res) => {
    console.log(`new upload = ${req.file.filename}`);
    try {
      let arr = await getArrPromise(req.file.path);
      db.connectAndOperateOnDb(arr, buildAndPopulateDatabase);
    } catch (err) {
      console.error(err);
    }

    res.send('Succesful Upload');
  }
);

app.listen(port || 3000, () => {
  console.log('Server is up on port ' + port);
});

function getArrPromise(filename) {
  return new Promise((resolve, rejects) => {
    readKeyToArray(filename, (err, arr) => {
      if (err) rejects(err);
      resolve(arr);
    });
  });
}

function readKeyToArray(filename, callback) {
  fs.readFile(filename, (err, data) => {
    if (err) callback(err, undefined);
    callback(undefined, data.toString().split('\n'));
  });
}
