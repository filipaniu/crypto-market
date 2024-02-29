import {useSearchParams} from "react-router-dom";
import HttpService from './services/HttpService';
import {useEffect, useState} from "react";
import {Grid, Paper} from "@mui/material";
import TradingViewWidget from "./TradingViewWidget";
import './CoinDetails.css';
import CoinIcon from "./CoinIcon";

function CoinDetails() {

    const CurrencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const [data, setData] = useState([]);

    let searchParams = useSearchParams()[0];
    const symbol = searchParams.get("symbol");

    const currencyPair = symbol + "USDT";

    useEffect(() => {
        HttpService.binance.getTradingDay(currencyPair).then((result) => {
            setData(result);
        });
    }, [symbol]);

    return <Grid container spacing={3}>
        <Grid item xs={6} lg={2}>
            <div className="statistics">
                <Paper sx={{padding: 3}} elevation={3}>
                    <h2>
                        <CoinIcon symbol={symbol}/>
                        <span>{currencyPair}</span>
                    </h2>
                    <h3>{CurrencyFormatter.format(data.lastPrice)} <span
                        className="price-change">{CurrencyFormatter.format(data.priceChange)} ({data.priceChangePercent}%)</span>
                    </h3>

                    <p>Todays statistics:</p>
                    <ul className="ohlc-stats">
                        <li>Open: {CurrencyFormatter.format(data.openPrice)}</li>
                        <li>High: {CurrencyFormatter.format(data.highPrice)}</li>
                        <li>Low: {CurrencyFormatter.format(data.lowPrice)}</li>
                        <li>Close: {CurrencyFormatter.format(data.lastPrice)}</li>
                        <li>Volume: {CurrencyFormatter.format(data.volume)}</li>
                    </ul>
                </Paper>
            </div>
        </Grid>
        <Grid item xs={6} lg={10} sx={{height: '92vh'}}>
            <TradingViewWidget symbol={currencyPair}/>
        </Grid>
    </Grid>;
}

export default CoinDetails;
