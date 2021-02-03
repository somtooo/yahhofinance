class YahooFinanceDataV10 {
  request = require('../financeData/utils/request');
  host = 'https://query1.finance.yahoo.com';
  baseUrl = '/v10/finance/quoteSummary/'; // + AAPL?modules=assetProfile%2CsummaryProfile (%2C is hex - ,)
  /*
    *****AVAILABLE MODULES******
    modules = [
   'assetProfile',
   'summaryProfile',
   'summaryDetail',
   'esgScores',
   'price',
   'incomeStatementHistory',
   'incomeStatementHistoryQuarterly',
   'balanceSheetHistory',
   'balanceSheetHistoryQuarterly',
   'cashflowStatementHistory',
   'cashflowStatementHistoryQuarterly',
   'defaultKeyStatistics',
   'financialData',
   'calendarEvents',
   'secFilings',
   'recommendationTrend',
   'upgradeDowngradeHistory',
   'institutionOwnership',
   'fundOwnership',
   'majorDirectHolders',
   'majorHoldersBreakdown',
   'insiderTransactions',
   'insiderHolders',
   'netSharePurchaseActivity',
   'earnings',
   'earningsHistory',
   'earningsTrend',
   'industryTrend',
   'indexTrend',
   'sectorTrend' ]
   */

  constructor() {}
  buildUrl(ticker, module) {
    return this.host + this.baseUrl + ticker + '?modules=' + module;
  }
  price(ticker, callback) {
    this.request(this.buildUrl(ticker, 'price'), function (resp) {
      var json = JSON.parse(resp);
      var quoteSummary = json['quoteSummary'];
      if (quoteSummary['error'] == null) {
        var result = quoteSummary['result'][0]['price'];
        callback(null, result);
      } else {
        callback(quoteSummary['error'], null);
      }
    });
  }
  summaryDetail(ticker, callback) {
    this.request(this.buildUrl(ticker, 'summaryDetail'), function (resp) {
      var json = JSON.parse(resp);
      var quoteSummary = json['quoteSummary'];
      if (quoteSummary['error'] == null) {
        var result = quoteSummary['result'][0]['summaryDetail'];
        callback(null, result);
      } else {
        callback(quoteSummary['error'], null);
      }
    });
  }
  defaultKeyStatistics(ticker, callback) {
    this.request(
      this.buildUrl(ticker, 'defaultKeyStatistics'),
      function (resp) {
        var json = JSON.parse(resp);
        var quoteSummary = json['quoteSummary'];
        if (quoteSummary['error'] == null) {
          var result = quoteSummary['result'][0]['defaultKeyStatistics'];
          callback(null, result);
        } else {
          callback(quoteSummary['error'], null);
        }
      }
    );
  }
  financialData(ticker, callback) {
    this.request(this.buildUrl(ticker, 'financialData'), function (resp) {
      var json = JSON.parse(resp);
      var quoteSummary = json['quoteSummary'];
      if (quoteSummary['error'] == null) {
        var result = quoteSummary['result'][0]['financialData'];
        callback(null, result);
      } else {
        callback(quoteSummary['error'], null);
      }
    });
  }

//   cleanData(result) {
//     for(let r in x){
//   if(typeof(x[r]) === "object"){
//     for(let q in x[r]){
//       if(q === "raw"){
//         x[r] = x[r][q]
//       }
//     }
//   }
// }

//   }
}
module.exports = new YahooFinanceDataV10();
