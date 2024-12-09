import React from "react";
import { useState, useEffect } from "react";
import "./AllCompaniesPage.css";
import { useNavigate } from "react-router";
import Search from "../../components/Search/Search";
import CreateNewCompany from "../../modals/CreateNewCompany/CreateNewCompany";

const URL = "http://localhost:3333/api/companies";

const AllCompaniesPage = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [companiesCopy, setCompaniesCopy] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setCompaniesCopy(data);
      });
  }, []);

  const toggleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="allCompaniesPage-main">
      <Search
        data={companiesCopy}
        setData={setCompaniesCopy}
        searchBy={"name"}
        notFilteredData={companies}
      />
      <div className="allCompaniesPage-wrapper">
        {user?.user?.id === 1 ? (
          <button className="allCompaniesPage-create" onClick={toggleModalOpen}>
            Create company
          </button>
        ) : null}

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
