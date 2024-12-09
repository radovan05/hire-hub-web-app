import React from "react";
import AllCompaniesPage from "../../pages/AllCompaniesPage/AllCompaniesPage";
import "./CreateNewCompany.css";

const URL = "http://localhost:3333/api/companies";

const CreateNewCompany = ({ toggleModalOpen, token }) => {
  const [payLoad, setPayLoad] = React.useState({
    name: "",
    email: "",
  });

  const handleSubmit = () => {
    console.log(payLoad.name);
    fetch(URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
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
  };

  return (
    <div className="modal" onClick={toggleModalOpen}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form>
          <h2>Create New Company:</h2>
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
            type="text"
            id="email"
            onChange={(e) => {
              setPayLoad({
                ...payLoad,
                email: e.target.value,
              });
            }}
          />

          <button type="button" onClick={handleSubmit}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewCompany;
