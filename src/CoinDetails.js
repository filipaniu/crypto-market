import {useSearchParams} from "react-router-dom";
import HttpService from './services/HttpService';
import {useEffect, useState} from "react";
import {Container, Grid} from "@mui/material";
import './CoinDetails.css';

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

    return <Grid container>
        <Grid item xs={4}>
            <h2>{currencyPair}</h2>
            <p>Todays Statistics:</p>
            <p>price: {CurrencyFormatter.format(data.lastPrice)}({CurrencyFormatter.format(data.priceChange)})</p>
            <p>o: {CurrencyFormatter.format(data.openPrice)}</p>
            <p>h: {CurrencyFormatter.format(data.highPrice)}</p>
            <p>l: {CurrencyFormatter.format(data.lowPrice)}</p>
            <p>c: {CurrencyFormatter.format(data.lastPrice)}</p>
        </Grid>
        <Grid item xs={8}>

        </Grid>
    </Grid>;
}

export default CoinDetails;
