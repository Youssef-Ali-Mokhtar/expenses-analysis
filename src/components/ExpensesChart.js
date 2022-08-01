import React from "react";

import Chart from "./Chart";

const ExpensesChart = (props) => {
  return (
    <Chart
      dataPoints={props.chartDataPoints}
      getSalary={props.getSalary}
      onSendMonth={props.onSendMonth}
      onOverlay={props.onOverlay}
    />
  );
};

export default ExpensesChart;
