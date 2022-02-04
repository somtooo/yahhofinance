const mongodb = require('mongodb');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./db/mongodb');
var FormData = require('form-data');
var request = require('request');


const MongoClient = mongodb.MongoClient;
const axios = require('axios');

const port = process.env.PORT;
const add = process.env.ADD;

const {
	updateDb,
	buildAndPopulateDatabase,
} = require('./db/databaseOperations');
const { rejects } = require('assert');
const { callbackify } = require('util');
const app = express();
const publicDirectoryPath = path.join(__dirname, '/public');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.use(express.static(publicDirectoryPath));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
	const client = new MongoClient(db.data.connectionURL);
	try {
		await client.connect();
		let dbs = client.db(db.data.databaseName);
		dbs.listCollections().toArray(function (err, collections) {
			res.render('index', { list: collections });
			//collections = [{"name": "coll1"}, {"name": "coll2"}]
		});
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
});

app.get('/download/:file', (req, res) => {
	// console.log(req.params.file);
	//downloadCSV(req.params.file);
	let localPath = '/home/download' + req.params.file;
	if (!fs.existsSync('./CSV/' + req.params.file)) {
		res.status(404).json({ message: 'file not found' });
		return;
	}
	res.download('./CSV/' + req.params.file, localPath);
});

app.post(
	'/stock-names',
	upload.single('stockTickerNames'),
	async (req, res) => {
		let avail = false;
		const client1 = new MongoClient(db.data.connectionURL);
		try {
			let arr = await getArrPromise(req.file.path);
			await client1.connect();
			let dbs = client1.db(db.data.databaseName);
			dbs.listCollections().toArray(function (err, collections) {
				for (let i = 0; i < collections.length; i++) {
					if (collections[i].name === req.file.filename) {
						avail = true;
						return db.connectAndOperateOnDb(arr, updateDb, req.file.filename);
					}
				}
				if (!avail) {
					db.connectAndOperateOnDb(
						arr,
						buildAndPopulateDatabase,
						req.file.filename
					);
				}
			});

			// if (avail) {
			//   db.connectAndOperateOnDb(arr, updateDb, req.file.filename);
			// } else {
			//   db.connectAndOperateOnDb(
			//     arr,
			//     buildAndPopulateDatabase,
			//     req.file.filename
			//   );
			// }
			res.redirect('/');
		} catch (err) {
			res.send(err);
		}
	}
);

app.listen(port || 3000, () => {
	console.log('Server is up on port ' + port);
});


function getArrPromise(filename) {
	return new Promise((resolve) => {
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

/*
function test() {
var formData = new FormData();
formData.append("stockTickerNames", add);
console.log("im running");

axios.post('http://localhost:3000/stock-names', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
}
*/

let req = request.post('http://localhost:3000/stock-names', function (err, resp, body) {
  if (err) {
    console.log(err);
  } else {
    console.log('URL: ' + body);
  }
});

let form = req.form();
form.append('stockTickerNames', fs.createReadStream(add));
