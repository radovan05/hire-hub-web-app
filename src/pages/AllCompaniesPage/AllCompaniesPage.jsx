import React from "react";
import { useState, useEffect } from "react";
import "./AllCompaniesPage.css";

const URL = "http://localhost:3333/api/companies";

const AllCompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  return (
    <div className="allCompaniesPage-main">
      <div className="allCompaniesPage-wrapper">
        {companies.map((company) => {
          return (
            <div className="allCompaniesPage-container">
              <div>
                <h4>{company.name}</h4>
                <p>{company.email}</p>
              </div>
              <div>{/* <button>X</button> */}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCompaniesPage;
