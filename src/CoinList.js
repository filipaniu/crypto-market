import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Grid} from "@mui/material";
import MarketValue from "./MarketValue";
import './CoinList.css';
import {useNavigate} from "react-router-dom";
import * as _ from "lodash";
import symbols from './symbols.json'
import ExchangeInfo from './services/ExchangeInfo';

const CurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function CoinList() {
    const [wsData, setWsData] = useState(symbols.data);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    let previousWsData = wsData;

    useEffect(() => {
        const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
        ws.onopen = () => {
            console.log("Socket has been opened")
        };
        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            const union = _.unionBy(data, previousWsData, 's');
            const sortedData = _.sortBy(union, ['s']);
            setWsData(sortedData);
            previousWsData = sortedData;
        };
    }, []);

    if (wsData.length > 0) {
        const coins = _.isEmpty(searchValue) ? wsData : _.filter(wsData, (x) => _.startsWith(x.s, searchValue));
        const rows = coins.map((x, i) => {
            // TODO 2 - integrate ExchangeInfo.get(symbol);
            // Apply exchangeInfo.get(....) => translate currency pair into base and quotes symbol. 
            //.. BTCUSDT -> {symbol: 'BTCUSDT', baseAsset:'BTC', quoteAsset:'USDT'}
            return <TableRow key={i} onClick={() => navigate("/coin?symbol=" + x.s)} className="coinRow">
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                    {/* use baseAsset as CoinIcon symbol value  */}
                    {/*<CoinIcon symbol={x.s}/>*/}
                </TableCell>
                <TableCell>{x.s}</TableCell>
                <TableCell>{CurrencyFormatter.format(x.c)}</TableCell>
                <TableCell><MarketValue>{x.P}</MarketValue></TableCell>
                <TableCell>{CurrencyFormatter.format(x.v)}</TableCell>
                {/*<TableCell>{CurrencyFormatter.format(x.marketCapUsd)}</TableCell>*/}
            </TableRow>

        })

        return <div>
            <h2>Coin list ({coins.length})</h2>
            <Grid container>
                <Grid item xs={12} md={6} xl={3}>
                    <TextField fullWidth={true} id="outlined-basic" label="Search" variant="outlined"
                               onChange={x => setSearchValue(x.target.value)}/>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: "0.5vw"}}></TableCell>
                            <TableCell>Icons</TableCell>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Price USD</TableCell>
                            <TableCell>Change 24h %</TableCell>
                            <TableCell>Volume USD 24h</TableCell>
                            {/*<TableCell>Market Cap</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer></div>;
    } else {
        return "No data";
    }
}

export default CoinList;
