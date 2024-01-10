import './App.css';
import CoinList from "./CoinList";
import {AppBar, Container, Toolbar} from "@mui/material";

function App() {

    return (
        <div className="App">
            <AppBar>
                <Toolbar>
                    <h2>Crypto Market</h2>
                </Toolbar>
            </AppBar>
            <Container>
                <CoinList/>
            </Container>
        </div>
    );
}

export default App;
