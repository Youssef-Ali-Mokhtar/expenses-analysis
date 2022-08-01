import React from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
  const setMonth = (label) => {
    props.onSendMonth(label);
  };

  return (
    <div className="chart-board">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={props.getSalary}
          label={dataPoint.label}
          onCustomClick={setMonth.bind(this, dataPoint.label)}
          onOverlay={props.onOverlay}
        />
      ))}
    </div>
  );
};

export default Chart;
