import React from "react";
import "./ShowReport.css";

const ShowReport = ({ toggleModalOpen, companyReport }) => {
  return (
    <div className="modal">
      <div className="modal-content">
       
            <div className="report-data">
              <p>Name: {companyReport.candidateName}</p>
              <p>Phase: {companyReport.phase}</p>
              <p>Status: {companyReport.status}</p>
              <p>
                Interview Date:{" "}
                {new Date(companyReport.interviewDate).toLocaleString()}
              </p>
              <p>Note: {companyReport.note}</p>
            </div>
        

        <div>
          <button className="close-btn" onClick={toggleModalOpen}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowReport;
