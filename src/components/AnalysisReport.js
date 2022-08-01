import "./AnalysisReport.css";

const AnalysisReport = (props) => {
  //get the values of the selected year in an array
  const dataPointValues = props.chartDataPoints.map(
    (dataPoint) => dataPoint.value
  );

  //   const totalMaximum = Math.max(...dataPointValues);

  //   console.log(totalMaximum);
  //calculate annual expenses
  const annualValue = (data) => {
    let total = 0;
    for (const i of data) {
      total += i;
    }
    return total;
  };

  let annualExpensesAmount = annualValue(dataPointValues); // Total annual expenses amount
  let averageMonthlyAmount =
    (annualValue(dataPointValues) / 12 / props.getSalary) * 100; // Average monthly expenses amount

  return (
    <div className="report-board">
      <h2>
        {"Average Monthly Expenses:"} {averageMonthlyAmount.toFixed(2)} {"%"}
      </h2>
      <h2>
        {"Total Annual Expenses:"} {annualExpensesAmount}
      </h2>
    </div>
  );
};

export default AnalysisReport;
