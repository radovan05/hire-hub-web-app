import React, { useState, useEffect } from "react";
import "./CreateNewReport.css";
import CreateNewCandidate from "../CreateNewCandidate/CreateNewCandidate";

const CreateNewReport = ({ closeModal, token, companyId, companyName }) => {
  const [candidates, setCandidates] = useState([]);
  const [dropdown, setDropdown] = useState("Select Candidate");
  const [createNewCandidate, setCreateNewCandidate] = useState(false);

  let phase = "";
  let status = "";
  let note = "";

  useEffect(() => {
    fetch(`http://localhost:3333/api/candidates`)
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
      });
  }, [createNewCandidate]);

  return (
    <div
      className="create-new-rep-main-div"
      onClick={() => {
        closeModal(false);
      }}
    >
      {createNewCandidate ? (
        <CreateNewCandidate closeModal={setCreateNewCandidate} token={token} />
      ) : null}
      <div
        className="create-new-rep-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="create-new-rep-text"> Add a new report</h2>
        <div className="create-new-rep-form">
          {/* note status i datum i phase              */}
          <h3>Candidate:</h3>
          <div className="create-new-rep-candidates">
            {dropdown?.name ?? dropdown}
            <div className="create-new-rep-dropdown">
              <p
                onClick={() => {
                  setCreateNewCandidate(true);
                }}
              >
                <h4>+ Create New</h4>
              </p>
              {candidates.map((el, i) => {
                return (
                  <p
                    onClick={() => {
                      setDropdown(el);
                    }}
                    key={i}
                  >
                    {el.name}
                  </p>
                );
              })}
            </div>
          </div>
          <h3>Phase</h3>{" "}
          <input
            type="text"
            onChange={(e) => {
              phase = e.target.input;
            }}
          />
          <h3>Status</h3>{" "}
          <input
            type="text"
            onChange={(e) => {
              status = e.target.input;
            }}
          />
          <h3>Note</h3>{" "}
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => {
              note = e.target.input;
            }}
          ></textarea>
          <button
            onClick={() => {
              if (
                dropdown.name !== undefined &&
                phase !== "" &&
                status !== "" &&
                note !== ""
              ) {
                fetch(`http://localhost:3333/api/reports`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    candidateId: dropdown.id,
                    candidateName: dropdown.name,
                    companyId: companyId,
                    companyName: companyName,
                    interviewDate: Date(),
                    phase: phase,
                    status: status,
                    note: note,
                  }),
                }).then((res) => res.json());
              } else {
                alert("not good");
              }
            }}
          >
            {" "}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewReport;
