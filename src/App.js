import './App.css';
import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function loadData() {
    const request = fetch("https://api4.binance.com/api/v3/ticker/24hr");
    return request.then(results => results.json());
}

function App() {

    let dataLoaded = false;

    const [data, setData] = useState([]);

    useEffect(() => {
        if (!dataLoaded) {
            dataLoaded = true;
            loadData().then(quotations => setData(quotations));
        }
    }, []);

    let tableView = "No data";
    if (data.length > 0) {
        const rows = data.map(x => {
            return <TableRow>
                <TableCell>{x.symbol}</TableCell>
                <TableCell>{x.askPrice}</TableCell>
                <TableCell>{x.bidPrice}</TableCell>
                <TableCell>{x.lastPrice}</TableCell>
                <TableCell>{x.volume}</TableCell>
            </TableRow>
        })
        tableView = <TableContainer>
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
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>Crypto Market</h2>
                {tableView}
            </header>
        </div>
    );
}

export default App;
