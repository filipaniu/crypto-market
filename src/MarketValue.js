function MarketValue(props) {
    let color = "black";
    if (props.children > 0) {
        color = "green";
    } else if (props.children < 0) {
        color = "red";
    }
    return <span style={{color: color}}>{props.children}</span>;
}
export default MarketValue;
