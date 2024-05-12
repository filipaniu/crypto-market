import * as _ from "lodash";

const exchangeInfo = require('../data/exchangeInfo.json');

class ExchangeInfo {

    symbols = exchangeInfo.exchangeInfo;

    get(symbol) {
        const found = _.find(this.symbols, { symbol: symbol });
        if (found) {
            return found;
        }
    }
}

const exchangeInfoSingletonService = new ExchangeInfo();
export default exchangeInfoSingletonService;
