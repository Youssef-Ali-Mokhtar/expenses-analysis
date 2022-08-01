import "./AnalysisSection.css";
import DropArea from "./DropArea";
import React, { useState } from "react";
import AnalysisBoard from "./AnalysisBoard";

const AnalysisSection = () => {
  const [data, setData] = useState("");
  const [dataIndices, setDataIndices] = useState("");

  const getDataHandler = (data) => {
    setData(data);
  };

  const getDataIndicesHandler = (dataIndices) => {
    setDataIndices(dataIndices);
  };

  return (
    <div className="analysis-section">
      {!data ? (
        <>
          <h1 className="note">
            Note: you must have "product", "price", and "date" fields in your
            excel file
          </h1>
          <DropArea
            onGetData={getDataHandler}
            onGetDataIndices={getDataIndicesHandler}
          />
        </>
      ) : (
        <AnalysisBoard
          onSendToBoard={data}
          onSendIndicesToBoard={dataIndices}
          onGetData={getDataHandler}
        />
      )}
    </div>
  );
};

export default AnalysisSection;
