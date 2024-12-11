import React, { useState, useEffect } from "react";
import "./CreateNewCandidate.css";

const CreateNewReport = ({ closeModal, token }) => {
  let name = "";
  let email = "";
  let bDay = "";
  let education = "";
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function sendData() {
    fetch(`http://localhost:3333/api/candidates`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        birthday: bDay,
        email: email,
        education: education,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    closeModal(false);
  }

  return (
    <>
      <div
        className="create-new-candidate-body"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="create-new-candidate-main-div">
          <div className="create-new-candidate-header">
            <p
              className="create-new-candidate-go-back"
              onClick={() => {
                closeModal(false);
              }}
            >{`< Go back`}</p>
          </div>
          <h3> Create New Candidate</h3>
          <div className="create-new-candidate-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={(e) => {
                name = e.target.value;
              }}
            />
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              onChange={(e) => {
                email = e.target.value;
              }}
            />
            <label htmlFor="bDay">Date of Birth</label>
            <input
              type="date"
              onChange={(e) => {
                bDay = e.target.value;
              }}
            />
            <label htmlFor="education">Education</label>
            <input
              type="text"
              onChange={(e) => {
                education = e.target.value;
              }}
            />
            <button
              onClick={() => {
                if (
                  email !== "" &&
                  name !== "" &&
                  bDay !== "" &&
                  education !== ""
                ) {
                  if (validateEmail(email)) {
                    sendData();
                  } else {
                    alert("email not good");
                  }
                } else {
                  alert("not good");
                }
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewReport;