import "./DropArea.css";
import * as XLSX from "xlsx";
import { FaCloudUploadAlt } from "react-icons/fa";
import React, { useState } from "react";

const DropArea = (props) => {
  const [highlighted, setHighlighted] = useState(false);

  function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
  }

  const getIndices = (data) => {
    const dateIndex = data[0].indexOf("date");
    const productIndex = data[0].indexOf("product");
    const priceIndex = data[0].indexOf("price");
    return { date: dateIndex, product: productIndex, price: priceIndex };
  };

  const modifyDate = (rawData) => {
    const dateIndex = getIndices(rawData).date;
    const arr = rawData.map((element, index) => {
      if (index > 0) {
        element[dateIndex] = ExcelDateToJSDate(element[dateIndex]);
      }
      return element;
    });
    return arr;
  };

  const getFileExtension = (filename) => {
    return filename.name.split(".").pop();
  };

  const uploadFile = (e, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      props.onGetData(modifyDate(data));
      props.onGetDataIndices(getIndices(data));
    };
    reader.readAsArrayBuffer(file);
  };

  const dropUploadFile = (e) => {
    const [file] = e.dataTransfer.files;
    if (getFileExtension(file) === "xlsx") {
      uploadFile(e, file);
    } else {
      console.log("Not the right file extention");
      alert("Not the right file extention");
    }
  };

  const btnUploadFile = (e) => {
    const [file] = e.target.files;
    if (getFileExtension(file) === "xlsx") {
      uploadFile(e, file);
    } else {
      alert("Not the right file extention");
    }
    // uploadFile(e, file);
  };

  return (
    <div
      className={`drop-area ${highlighted ? "drag-action" : ""}`}
      onDragEnter={() => {
        setHighlighted(true);
      }}
      onDragLeave={() => {
        setHighlighted(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        setHighlighted(false);
        dropUploadFile(e);
      }}
    >
      <FaCloudUploadAlt className="upload-icon" />
      <p className="drop-text">Drag & Drop to Upload File</p>
      <p className="drop-text">OR</p>
      <label htmlFor="files" className="btn">
        Select Excel File
      </label>
      <input type="file" id="files" onChange={btnUploadFile} />
    </div>
  );
};

export default DropArea;
