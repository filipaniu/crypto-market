import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import HttpService from './services/HttpService';

function CoinList() {
    let dataLoaded = false;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!dataLoaded) {
            dataLoaded = true;
            HttpService.getCurrentPrices().then(quotations => setData(quotations));
        }
    }, []);

    if (data.length > 0) {
        const rows = data.map((x, i) => {
            return <TableRow key={i}>
                <TableCell>{x.symbol}</TableCell>
                <TableCell>{x.askPrice}</TableCell>
                <TableCell>{x.bidPrice}</TableCell>
                <TableCell>{x.lastPrice}</TableCell>
                <TableCell>{x.volume}</TableCell>
            </TableRow>
        })
        return <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Ask price</TableCell>
                        <TableCell>Bid price</TableCell>
                        <TableCell>Last price</TableCell>
                        <TableCell>Volume</TableCell>
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
// TODO
// 1. Ikony coinów
// 2. wykresy
// 3. czerwone i zielone czcionki
// 4. formatowanie liczb
// 5. Pełne nazwy
// 6. klikalne pierwsze ikony

export default CoinList;
