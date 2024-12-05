import React from "react";
import "./CompaniesReportPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const CompaniesReportPage = () => {
  const [reports, setReports] = useState([]);
  const { id } = useParams();

  const REPORTS_URL = `http://localhost:3333/api/reports?companyId=${id}`;

  // const id = (window.location.search).slice(2);

  useEffect(() => {
    fetch(REPORTS_URL)
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, [id]);

  const companyReport = reports.filter((report) => {
    return report.companyId === Number(id);
  });

  if(!companyReport.length) return <p>Loading...</p>
console.log(companyReport?.[0].companyName)
  return (
    <div className="companiesReport-main">
      <h1>{companyReport?.[0].companyName}</h1>
      <div className="companiesReport-wrapper">
        {companyReport.length > 0 ? (

          companyReport.map((report) => (
            <div key={report.id} className='companiesReport-container' onClick={() => {
              
            }}>
              <p>Name: {report.candidateName}</p>
              <p>Status: {report.status}</p>
              <p>Phase: {report.phase}</p>
              <p>
                Interview Date:{" "}
                {new Date(report.interviewDate).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>not found</p>
        )}
      </div>
    </div>
    
  );
};

export default CompaniesReportPage;
