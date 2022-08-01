import "./MonthlySalaryInput.css";
import React, { useState } from "react";

const MonthlySalaryInput = (props) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
    props.onGetSalary(event.target.value);
  };

  return (
    <div className="salary-input">
      <label htmlFor="mIncome">Monthly Income</label>
      <input
        autoComplete="off"
        type="text"
        id="mIncome"
        name="mIncome"
        onChange={handleChange}
        value={message}
      />
    </div>
  );
};

export default MonthlySalaryInput;
