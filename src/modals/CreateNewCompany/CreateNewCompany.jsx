import React from "react";
import AllCompaniesPage from "../../pages/AllCompaniesPage/AllCompaniesPage";
import "./CreateNewCompany.css";
import { useNavigate } from "react-router";

const URL = "http://localhost:3333/api/companies";

const CreateNewCompany = ({ toggleModalOpen, token, refresh }) => {
  const [payLoad, setPayLoad] = React.useState({
    name: "",
    email: "",
  });
  function validateEmail(email) {
    const emailPattern = ` /^[^\s@]+@[^\s@]+\.[^\s@]+$/`;

    return emailPattern.test(email);
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }
  const handleSubmit = () => {
    if (validateEmail(payLoad.email)) {
      if (payLoad.name !== "" && payLoad.email !== "") {
        fetch(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            name: payLoad.name,
            email: payLoad.email,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        toggleModalOpen();
        refresh();
      } else {
        alert("not good!");
      }
    } else {
      alert("mail not good!");
    }
  };

  return (
    <div className="modal" onClick={toggleModalOpen}>
      <div
        className="new-company-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="new-company-div">
          <form>
            <h2>Add a new company</h2>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => {
                setPayLoad({
                  ...payLoad,
                  name: e.target.value,
                });
              }}
            ></input>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setPayLoad({
                  ...payLoad,
                  email: e.target.value,
                });
              }}
            />

            <button type="button" onClick={handleSubmit}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewCompany;
