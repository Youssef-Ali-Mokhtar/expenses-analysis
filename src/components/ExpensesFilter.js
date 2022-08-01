import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };
  return (
    <div className="expenses-filter">
      <label>Filter by year</label>
      <select value={props.selected} onChange={dropDownChangeHandler}>
        {props.years.map((element) => (
          <option key={Math.floor(Math.random() * 10000)} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpensesFilter;
