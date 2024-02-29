import './App.css';
import CoinList from "./CoinList";
import {AppBar, Container, Toolbar} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import CoinDetails from "./CoinDetails";
import {Link} from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <AppBar>
                <Toolbar>
                    <Link to={"/"}>
                        <h2>Crypto Market</h2>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false}>
                <Routes>
                    <Route exact path='/' element={<CoinList/>}/>
                    <Route exact path='/coin' element={<CoinDetails/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
