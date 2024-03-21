import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import HttpService from './services/HttpService';
import MarketValue from "./MarketValue";
import CoinIcon from './CoinIcon';
import './CoinList.css';
import {useNavigate} from "react-router-dom";
import * as _ from "lodash";

const CurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function CoinList() {
    const [wsData, setWsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // !ticker@arr
        const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
        ws.onopen = () => {
            console.log("Socket has been opened")
        };
        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            const sortedData = _.sortBy(data,['s']);
            setWsData(sortedData)
            // TODO problem z tym ze binance przesyla nie wszystkie valuty
        };
    }, []);
    // "e": "24hrTicker",  // Event type
    //     "E": 1672515782136,     // Event time
    //     "s": "BNBBTC",      // Symbol
    //     "p": "0.0015",      // Price change
    //     "P": "250.00",      // Price change percent
    //     "w": "0.0018",      // Weighted average price
    //     "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
    //     "c": "0.0025",      // Last price
    //     "Q": "10",          // Last quantity
    //     "b": "0.0024",      // Best bid price
    //     "B": "10",          // Best bid quantity
    //     "a": "0.0026",      // Best ask price
    //     "A": "100",         // Best ask quantity
    //     "o": "0.0010",      // Open price
    //     "h": "0.0025",      // High price
    //     "l": "0.0010",      // Low price
    //     "v": "10000",       // Total traded base asset volume
    //     "q": "18",          // Total traded quote asset volume
    //     "O": 0,             // Statistics open time
    //     "C": 86400000,      // Statistics close time
    //     "F": 0,             // First trade ID
    //     "L": 18150,         // Last trade Id
    //     "n": 18151          // Total number of trades
    if (wsData.length > 0) {
        const rows = wsData.map((x, i) => {
            return <TableRow key={i} onClick={() => navigate("/coin?symbol=" + x.s)} className="coinRow">
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                    {/*<CoinIcon symbol={x.s}/>*/}
                </TableCell>
                <TableCell>{x.s}</TableCell>
                <TableCell>{CurrencyFormatter.format(x.c)}</TableCell>
                <TableCell><MarketValue>{x.P}</MarketValue></TableCell>
                <TableCell>{CurrencyFormatter.format(x.v)}</TableCell>
                {/*<TableCell>{CurrencyFormatter.format(x.marketCapUsd)}</TableCell>*/}
            </TableRow>

        })

        return <TableContainer>
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
        </TableContainer>;
    } else {
        return "No data";
    }
}

export default CoinList;
