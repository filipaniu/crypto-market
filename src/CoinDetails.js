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

    const [data, setData] = useState({});
    const [data7d, setData7d] = useState({});
    const [wsData, setWsData] = useState({});

    let searchParams = useSearchParams()[0];
    const symbol = searchParams.get("symbol");

    const currencyPair = symbol + "USDT";

    function setupWebSockets(){
        const WS = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");
        WS.onopen = (msg) => console.log("WebSocket has been opened", msg);
        WS.onerror = (error) => console.log("WebSocket error", error);
        WS.onclose = (msg) => console.log("WebSocket has been closed", msg);
        WS.onmessage = (msg) => setWsData(JSON.parse(msg.data));
    }

    useEffect(() => {
        HttpService.binance.getTradingDay(currencyPair).then((result) => {
            setData(result);
        });
        HttpService.binance.getRollingWindow(currencyPair, "7d").then((result) => {
            setData7d(result);
        });
        setupWebSockets();
    }, [symbol]);

    return <Grid container spacing={3}>
        <Grid item xs={6} lg={2}>
            <div className="statistics">
                <Paper sx={{padding: 3}} elevation={3}>
                    <h2>
                        <CoinIcon symbol={symbol}/>
                        <span>{currencyPair}</span>
                    </h2>
                    <h3>
                        {CurrencyFormatter.format(wsData.c)} 
                        <span className="price-change">{CurrencyFormatter.format(wsData.p)} ({wsData.P}%)</span>
                    </h3>

                    <p>Todays statistics:</p>
                    <ul className="ohlc-stats">
                        <li>Open: {CurrencyFormatter.format(data.openPrice)}</li>
                        <li>High: {CurrencyFormatter.format(data.highPrice)}</li>
                        <li>Low: {CurrencyFormatter.format(data.lowPrice)}</li>
                        <li>Close: {CurrencyFormatter.format(data.lastPrice)}</li>
                        <li>Volume: {CurrencyFormatter.format(data.volume)}</li>
                    </ul>

                    <p>7 days statistics:</p>
                    <ul className="ohlc-stats">
                        <li>Open: {CurrencyFormatter.format(data7d.openPrice)}</li>
                        <li>High: {CurrencyFormatter.format(data7d.highPrice)}</li>
                        <li>Low: {CurrencyFormatter.format(data7d.lowPrice)}</li>
                        <li>Close: {CurrencyFormatter.format(data7d.lastPrice)}</li>
                        <li>Volume: {CurrencyFormatter.format(data7d.volume)}</li>
                        <li> Price
                            Change: <span>{CurrencyFormatter.format(data7d.priceChange)} ({data7d.priceChangePercent}%)</span>
                        </li>
                    </ul>
                </Paper>
            </div>
        </Grid>
        <Grid item xs={6} lg={10} sx={{height: '92vh'}}>
            <TradingViewWidget symbol={currencyPair}/>
        </Grid>
    </Grid>
        ;
}

export default CoinDetails;
