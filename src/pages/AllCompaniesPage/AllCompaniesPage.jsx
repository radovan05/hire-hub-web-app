import React from "react";
import { useState, useEffect } from "react";
import "./AllCompaniesPage.css";
import { useNavigate } from "react-router";
import Search from "../../components/Search/Search";

const URL = "http://localhost:3333/api/companies";

const AllCompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [companiesCopy, setCompaniesCopy] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setCompaniesCopy(data);
      });
  }, []);

  return (
    <div className="allCompaniesPage-main">
      <Search
        data={companiesCopy}
        setData={setCompaniesCopy}
        searchBy={"name"}
        notFilteredData={companies}
      />
      <div className="allCompaniesPage-wrapper">
        {companiesCopy.map((company, i) => {
          return (
            <div
              key={i}
              className="allCompaniesPage-container"
              onClick={() => {
                navigate(`/reports/${company.id}`);
              }}
            >
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
