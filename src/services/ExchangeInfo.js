import * as _ from "lodash";

import HttpService from './HttpService';

class ExcahngeInfo {

    symbols = [];

    constructor() {
        console.log("HTTP request for Exchange info (should run only once)");
        HttpService.binance.getExchangeInfo().then(response => {
            this.symbols = _.map(response.symbols, c => _.pick(c, ['symbol', 'baseAsset', 'quoteAsset']));
        });
    }

    get(symbol) { // symbol = BTCUSDT, ETHBTC
        // TODO 1 implement get
        // lookup this.symbols
        // ? Find baseAsset and quoteAsset for given symbol 
    }
}

const exchangeInfoSingletonService = new ExcahngeInfo();
export default exchangeInfoSingletonService;
