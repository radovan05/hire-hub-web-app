import React from "react";
import "./ShowReport.css";

const ShowReport = ({ toggleModalOpen }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="report-data">
          <p>qwe</p>
          <p>rwe</p>
          <p>dfg</p>
        </div>
        <div>
          <button className="close-btn" onClick={toggleModalOpen}>X</button>
        </div>
      </div>
    </div>
  );
};

export default ShowReport;

