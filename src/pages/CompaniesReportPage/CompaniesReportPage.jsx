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
  const [companyName, setCompanyName] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [reportCopy, setReportCopy] = useState([]);
  const [createNewRep, setCreateNewRep] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const REPORTS_URL = `http://localhost:3333/api/reports?companyId=${id}`;

  useEffect(() => {
    fetch(REPORTS_URL)
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setReportCopy(data);
      });
  }, [id, refresh, createNewRep]);

  useEffect(() => {
    fetch(`http://localhost:3333/api/companies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompanyName(data.name);
      });
  }, [id]);

  const toggleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  function delReport(id) {
    console.log(id);
    fetch(`http://localhost:3333/api/reports/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return new Error("Something went wrong!");
      })
      .then(() => {
        setRefresh((prevValue) => !prevValue);
      });
  }

  return (
    <div className="companiesReport-main">
      <h1>{companyName}</h1>
      <Search
        data={reports}
        setData={setReports}
        searchBy={"candidateName"}
        notFilteredData={reportCopy}
      />

      <div className="companiesReport-wrapper">
        {user?.user.id === 1 ? (
          <button
            onClick={() => {
              setCreateNewRep(true);
            }}
          >
            + Add a new report
          </button>
        ) : null}
        {createNewRep ? (
          <CreateNewReport
            closeModal={setCreateNewRep}
            token={user.accessToken}
            companyId={id}
            companyName={companyName}
          />
        ) : null}
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
              {" "}
              <div>
                <p>Name: {report.candidateName}</p>
                <p>Phase: {report.phase}</p>
                <p>
                  Interview Date:{" "}
                  {new Date(report.interviewDate).toLocaleString()}
                </p>
              </div>
              {user?.user.id === 1 ? (
                <button className="report-del-btn">
                  <i
                    className="fa"
                    onClick={(e) => {
                      delReport(report.id);
                      e.stopPropagation();
                    }}
                  >
                    &#xf014;
                  </i>
                </button>
              ) : undefined}
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
