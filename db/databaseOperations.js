const yahooFinanceDataV10 = require('../financeData/yahooFinanceDataV10');
const { downloadCSV } = require('./mongodb');

async function updateDb(arr, db, portfolio) {
	console.log(portfolio);
	let updatePromise;
	for (let x of arr) {
		updatePromise = db.collection(portfolio).updateOne(
			{
				ticker: x,
			},
			{
				$set: await getDataPromise(x),
			}
		);
		updatePromise
			.then((result) => {})
			.catch((err) => {
				downloadCSV(portfolio);
				// console.log(err);
			});
	}

	downloadCSV(portfolio);
}

async function buildAndPopulateDatabase(arr, db, portfolio) {
	console.log(portfolio);
	console.log('This is the arr build and populate', arr);

	for (let x of arr) {
		db.collection(portfolio).insertOne(
			await getDataPromise(x),
			(err, result) => {
				if (err) {
					return console.log(err);
					downloadCSV(portfolio);
				}
				// console.log(result.ops);
			}
		);
	}
	downloadCSV(portfolio);
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
									cleanData(finalObject);
									callback(finalObject);

									// combinedarr.push(finalObject);
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

function cleanData(x) {
	for (let r in x) {
		if (typeof x[r] === 'object') {
			for (let q in x[r]) {
				if (q === 'raw') {
					x[r] = x[r][q];
				}
			}
		}
	}
}

module.exports = { updateDb, buildAndPopulateDatabase };
