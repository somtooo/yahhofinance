# Yahoo-Financial-Data
Npm module for node.js giving the ability to access real time financial data from yahoo finance.

## Installation
```bash
$ npm install yahoo-financial-data
```

## Usage

```bash
var yahoo = require('yahoo-financial-data');
```

```bash
yahoo.quote('AAPL', function (err, data) {
    console.log(data);
});
```

```bash
yahoo.marketCap('AAPL', function (err, data) {
    console.log(data);
});
```

```bash
yahoo.history('AAPL', '2020-01-01', '2020-02-01', '1d', function (err, data) {
    console.log(data);
});
```
