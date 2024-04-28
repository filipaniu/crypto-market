import * as _ from "lodash";

const exchangeInfo = require('./../data/exchangeInfo.json');

class ExchangeInfo {

    counter = 0;

    symbols = exchangeInfo.exchangeInfo;

    get(symbol) {
        const found = _.find(this.symbols, { symbol: symbol });
        if (found) {
            return found;
        }
        else {
            console.log(found);
            console.error("Not found", symbol, ++this.counter);
        }
    }
}

const exchangeInfoSingletonService = new ExchangeInfo();
export default exchangeInfoSingletonService;
