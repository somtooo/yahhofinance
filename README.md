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
// args
// 1. Ticker symbol
// 2. Desired Value ['high', 'low', 'open', 'close', 'volume']
// 3. Start Date
// 4. End Date
// 5. Interval ["1d","5d","1mo","3mo","6mo","1y","2y","5y","10y","ytd","max"]

yahoo.history('AAPL', 'close', "2020-11-01", "2020-11-08", '1d', function (err, data) {
    //  [
    //    108.7699966430664,
    //    110.44000244140625,
    //    114.94999694824219,
    //    119.02999877929688,
    //    118.69000244140625
    //  ]
});
```
