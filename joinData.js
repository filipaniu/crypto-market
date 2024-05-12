const _ = require('lodash');

const exchangeInfo = require('./src/data/_exchangeInfo.bak.json');
const icons = require('./src/data/icons.json');
const fs = require("node:fs");

const symbolsArray = _.reduce(exchangeInfo.exchangeInfo, (accumulator, item) => {
    const quoteAssetIcon = _.toLower(item.quoteAsset) + '.svg';
    if (_.includes(icons, quoteAssetIcon)) {
        item.quoteAssetIcon = quoteAssetIcon;
    }
    const baseAssetIcon = _.toLower(item.baseAsset) + '.svg';
    if (_.includes(icons, baseAssetIcon)) {
        item.baseAssetIcon = baseAssetIcon;
    }
    accumulator.push(item);
    return accumulator;
}, []);

const output = JSON.stringify({exchangeInfo: symbolsArray}, null, 2);
fs.writeFileSync("./output.json", output);