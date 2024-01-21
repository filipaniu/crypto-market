function MarketValue(props) {
    const  MarketValueFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2});
    let color = "black";
    if (props.children > 0) {
        color = "green";
    } else if (props.children < 0) {
        color = "red";
    }
    return <span style={{color: color}}>{MarketValueFormatter.format(props.children)}</span>;
}
export default MarketValue;
