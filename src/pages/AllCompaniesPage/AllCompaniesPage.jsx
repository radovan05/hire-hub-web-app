import React from "react";
import { useState, useEffect } from "react";
import "./AllCompaniesPage.css";
import { useNavigate } from "react-router";
import Search from "../../components/Search/Search";
import CreateNewCompany from "../../modals/CreateNewCompany/CreateNewCompany";
// import { REPORTS_URL } from "../CompaniesReportPage/CompaniesReportPage";

const URL = "http://localhost:3333/api/companies";

const AllCompaniesPage = ({ user, setUser,setLogin }) => {
  const [companies, setCompanies] = useState([]);
  const [companiesCopy, setCompaniesCopy] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let delReviews = [];
  const navigate = useNavigate();

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setCompaniesCopy(data);
      });
  }, [refresh]);

  const toggleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteCompanyById = (id) => {
    const REPORTS_URL = `http://localhost:3333/api/companies/${id}`;

    fetch(REPORTS_URL, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then(res => res.json())
      .then((data) => {
        if (data === "jwt expired") {
          setLogin(false);
        }
        setRefresh((prevValue) => !prevValue);
      });

    fetch(`http://localhost:3333/api/reports?companyId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        data.map((el) => {
          delReviews.push(el.id);
        });
      });
    if (delReviews.length !== 0) {
      
      delReviews.map((el) => {
        fetch(`http://localhost:3333/api/reports/${el}`, {
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
        delReviews = [];
      });
    }
  };

  const handleConfirmation = (companyId, event) => {
    event.stopPropagation(); 
    const userResponse = window.confirm("Are you sure you want to delete this company?");
    if (userResponse) {
      deleteCompanyById(companyId);  
    }
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
            + Add a new company
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
              <div>
                {user?.user?.id === 1 ? (
                  <button
                    onClick={(e) => handleConfirmation(company.id, e)} 
                  >
                    <i className="fa">&#xf014;</i>
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <CreateNewCompany
          toggleModalOpen={toggleModalOpen}
          token={user.accessToken}
          refresh={() => {
            setRefresh((prevValue) => !prevValue);
          }}
          setLogin={setLogin}
        />
      )}
    </div>
  );
};

export default AllCompaniesPage;
