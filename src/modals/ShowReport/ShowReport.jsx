import React, { useEffect, useState } from "react";
import "./ShowReport.css";

const ShowReport = ({ toggleModalOpen, companyReport }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const CANDIDATES_URL = `http://localhost:3333/api/candidates?id=${companyReport.candidateId}`;
    fetch(CANDIDATES_URL)
      .then((res) => res.json())
      .then((data) => setCandidates(data[0]));
  },[]);

  return (
    <div className="modal" onClick={toggleModalOpen}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-data">
          <p>
            <strong>Name:</strong> {companyReport.candidateName}
          </p>
          <p>
            <strong>Birthday:</strong> {candidates.birthday}
          </p>
          <p>
            <strong>Education:</strong> {candidates.education}
          </p>
          <p>
            <strong>Email:</strong> {candidates.email}
          </p>
          <p>
            <strong>Phase:</strong> {companyReport.phase}
          </p>
          <p>
            <strong>Status:</strong> {companyReport.status}
          </p>
          <p>
            <strong>Interview Date: </strong>
            {new Date(companyReport.interviewDate).toLocaleString()}
          </p>
          <p>
            <strong>Note: </strong> {companyReport.note}
          </p>
          
        </div>
<button className="close-btn" onClick={toggleModalOpen}>
            X
          </button>
        <div></div>
      </div>
    </div>
  );
};

export default ShowReport;
