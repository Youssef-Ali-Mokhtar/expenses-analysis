import "./AnalysisBoard.css";
import ExpensesFilter from "./ExpensesFilter";
import React, { useState } from "react";
import ExpensesChart from "./ExpensesChart";
import MonthlySalaryInput from "./MonthlySalaryInput";
import AnalysisReport from "./AnalysisReport";
import ItemsOverlay from "./ItemsOverlay";

const AnalysisBoard = (props) => {
  //get the index of date column in the array
  const indices = props.onSendIndicesToBoard;
  //Get unique year values
  const expensesYears = (years) => {
    const arr = [];
    for (let i = 1; i < years.length; i++) {
      arr.push(years[i][indices.date].getFullYear());
    }
    return Array.from(new Set(arr));
  };

  const [filteredYear, setFilteredYear] = useState(
    expensesYears(props.onSendToBoard)[
      expensesYears(props.onSendToBoard).length - 1 //ExpensesYears most recent year or last index
    ].toString()
  );
  //Filter expenses based on the seleced year
  const filteredExpenses = props.onSendToBoard.filter((expense, index) => {
    if (index > 0) {
      return expense[indices.date].getFullYear().toString() === filteredYear;
    }
    return "";
  });

  //To assign the selected year value to useState
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const [salary, getSalary] = useState("1000");

  const getSalaryHandler = (salary) => {
    getSalary(salary);
  };

  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of filteredExpenses) {
    const expenseMonth = expense[indices["date"]].getMonth();
    chartDataPoints[expenseMonth].value += expense[indices["price"]];
  }

  const [month, setMonth] = useState("");

  const sendMonthHandler = (month) => {
    setMonth(month);
  };

  const filteredMonthExpenses = (expenses, month) => {
    return expenses.filter((element) => {
      return (
        element[indices.date].toLocaleString("default", {
          month: "short",
        }) === month
      );
    });
  };

  //filteredMonthExpenses(filteredExpenses, month)
  // console.log(chartDataPoints[filteredExpenses[0][3].getMonth()].value);

  const [overlay, setOverlay] = useState(false);

  const overlayHandler = (status) => {
    setOverlay(status);
  };

  const cancelBoardHandler = () => {
    props.onGetData("");
  };

  return (
    <div className="analysis-board">
      <div className="filters">
        <MonthlySalaryInput onGetSalary={getSalaryHandler} />
        <ExpensesFilter
          selected={filteredYear ? filteredYear : expensesYears[0]}
          onChangeFilter={filterChangeHandler}
          years={expensesYears(props.onSendToBoard)}
        />
      </div>
      <ExpensesChart
        getSalary={salary}
        chartDataPoints={chartDataPoints}
        onSendMonth={sendMonthHandler}
        onOverlay={overlayHandler}
      />
      <AnalysisReport getSalary={salary} chartDataPoints={chartDataPoints} />
      <button onClick={cancelBoardHandler}>Cancel</button>
      {filteredMonthExpenses(filteredExpenses, month).length > 0 && overlay ? (
        <ItemsOverlay
          filteredMonths={filteredMonthExpenses(filteredExpenses, month)}
          indices={indices}
          onOverlay={overlayHandler}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AnalysisBoard;
