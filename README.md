# Yahoo-Financial-Data
Node.js module for accessing real time financial data from yahoo finance.

## Installation
```bash
$ npm install yahoo-financial-data
```

## Usage

```bash
var yahoo = require('yahoo-financial-data');
```

```bash
yahoo.price('AAPL', function (err, data) {
    // 119.65
});
```

```bash
yahoo.history('AAPL', "2020-11-01", "2020-11-08", '1d', function (err, data) {
    //  [
    //    108.7699966430664,
    //    110.44000244140625,
    //    114.94999694824219,
    //    119.02999877929688,
    //    118.69000244140625
    //  ]
});
```
