import React from "react";
import "./CompaniesReportPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ShowReport from "../../modals/ShowReport/ShowReport";
import Search from "../../components/Search/Search";
import CreateNewReport from "../../modals/CreateNewReport/CreateNewReport";

const CompaniesReportPage = ({ user }) => {
  const [reports, setReports] = useState([]);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [reportCopy, setReportCopy] = useState([]);
  const [createNewRep, setCreateNewRep] = useState(false);
 
  const REPORTS_URL = `http://localhost:3333/api/reports?companyId=${id}`;

  useEffect(() => {
    fetch(REPORTS_URL)
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setReportCopy(data);
      });
  }, [id]);

  

  const toggleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!reports.length) return <p>Loading...</p>;

  return (
    <div className="companiesReport-main">
      <h1>{reports?.[0].companyName}</h1>
      <Search
        data={reports}
        setData={setReports}
        searchBy={"candidateName"}
        notFilteredData={reportCopy}
      />

      <div className="companiesReport-wrapper">
        {user?.user.id === 1 ? (
          <div
            onClick={() => {
              setCreateNewRep(true);
            }}
          >
            + Add New Report
          </div>
        ) : null}
        {createNewRep ? <CreateNewReport closeModal={setCreateNewRep} token={user.accessToken} companyId={id} companyName={reports?.[0].companyName}/> : null}
        {reports.length > 0 ? (
          reports.map((report, i) => (
            <div
              key={i}
              className="companiesReport-container"
              onClick={() => {
                toggleModalOpen();
                setModalData(report);
              }}
            >
              <p>Name: {report.candidateName}</p>
              <p>Phase: {report.phase}</p>
              <p>
                Interview Date:{" "}
                {new Date(report.interviewDate).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No data found for this company</p>
        )}
      </div>
      {isModalOpen && (
        <ShowReport
          toggleModalOpen={toggleModalOpen}
          companyReport={modalData}
        />
      )}
    </div>
  );
};

export default CompaniesReportPage;
