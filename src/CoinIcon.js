export default function CoinIcon(props) {
    const iconUrl = "icons/" + props.symbol.toLowerCase() + ".svg";
    return <img style={{height: 35}} className="coin-icon" src={iconUrl}/>;
}