import React, { useEffect, useState } from "react";
import "./ShowReport.css";



const ShowReport = ({ toggleModalOpen, companyReport }) => {

  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const CANDIDATES_URL = `http://localhost:3333/api/candidates?id=${companyReport.candidateId}`
    fetch(CANDIDATES_URL).then((res) => res.json()).then((data) => setCandidates(data[0]))
  })
  

  return (
    <div className="modal">
      <div className="modal-content">
       
            <div className="report-data">
              <p>Name: {companyReport.candidateName}</p>
              <p>Birthday: {candidates.birthday}</p>
              <p>Education: {candidates.education}</p>
              <p>Email: {candidates.email}</p>
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
