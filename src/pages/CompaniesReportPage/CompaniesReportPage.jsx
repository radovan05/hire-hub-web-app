import React from "react";
import "./CompaniesReportPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ShowReport from "../../modals/ShowReport/ShowReport";

const CompaniesReportPage = () => {
  const [reports, setReports] = useState([]);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData,setModalData] = useState('');
  

  const REPORTS_URL = `http://localhost:3333/api/reports?companyId=${id}`;

  

  useEffect(() => {
    fetch(REPORTS_URL)
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, [id]);

  const toggleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

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
            
            <div key={report.id} className='companiesReport-container' onClick={()=>{
              toggleModalOpen(); 
              setModalData(report)
            }}>
              <p>Name: {report.candidateName}</p>
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
      {isModalOpen && <ShowReport  toggleModalOpen={toggleModalOpen}  companyReport={modalData}/>}
    </div>
    
  );
};

export default CompaniesReportPage;
