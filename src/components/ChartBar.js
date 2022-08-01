import "./ChartBar.css";

const ChartBar = (props) => {
  const barClick = () => {
    props.onCustomClick();
    props.onOverlay(true);
  };

  let barFillHeight = "0%";
  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }
  return (
    <div className="chart-bar" onClick={barClick}>
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div className="label-holder">
        <div className="chart-bar__label">{props.label}</div>
        <div className="chart-bar__label">{barFillHeight}</div>
      </div>
    </div>
  );
};

export default ChartBar;
