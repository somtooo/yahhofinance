class YahooFinanceDataV8 {
    request = require("../financeData/utils/request")
    convertDate = require("../financeData/utils/dateConverter")
    host = "https://query1.finance.yahoo.com"
    baseUrl = "/v8/finance/chart/"  // + AAPL?symbol=AAPL&period1=0&period2=9999999999&interval=1d
    constructor() {

    }
    
    buildUrl(ticker, startDate, endDate, interval) {
        var endpoint = (this.host + this.baseUrl + ticker + "?symbol=" + ticker + "&period1=" + startDate + "&period2=" + endDate + "&interval=" + interval)
        //console.log(endpoint)
        return endpoint
    }
    price(ticker, startDate, endDate, interval, callback) {
        var start = this.convertDate(startDate)
        var end = this.convertDate(endDate)
        this.request(this.buildUrl(ticker, start, end, interval), function(resp) {
            var json = JSON.parse(resp)
            var quoteSummary = json["chart"]
            if (quoteSummary["error"] == null)
            {
                var result = quoteSummary["result"]
                callback(null, result)
            }
            else 
            {
                callback(quoteSummary["error"], null)
            }
        })
    }
    
}
module.exports = new YahooFinanceDataV8();