import "./OverlayContent.css";

const OverlayContent = (props) => {
  return (
    <div className="item">
      <div className="date-label">
        <h5>{props.filteredMonths[props.indices.date].getDay()}</h5>
        <h3>
          {props.filteredMonths[props.indices.date].toLocaleString("default", {
            month: "short",
          })}
        </h3>
        <h5>{props.filteredMonths[props.indices.date].getFullYear()}</h5>
      </div>
      <div className="product-label">
        <h2>{props.filteredMonths[props.indices.product]}</h2>
      </div>
      <div className="price-label">
        <h2>{props.filteredMonths[props.indices.price]}</h2>
      </div>
    </div>
  );
};

export default OverlayContent;
