import React from "react";
import "./Header.css";
import { Navigate, useNavigate } from "react-router";
import { useState } from "react";

const Header = ({ user, setUser }) => {
  const [log, setLog] = useState(undefined);
  const navigate = useNavigate();
  let classSelectedHome;
  let classSelectedCompanies;

  if (window.location.pathname === "/") {
    classSelectedHome = "header-selected";
    classSelectedCompanies = "";
  } else if (window.location.pathname === "/companies") {
    classSelectedCompanies = "header-selected";
    classSelectedHome = "";
  }
  return (
    <>
      <div className="header-main-div">
        <img
          src={require("../../resources/pictures/logo.png")}
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="header-pages">
          {" "}
          <p
            className={classSelectedHome}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>{" "}
          <span>|</span>{" "}
          <p
            className={classSelectedCompanies}
            onClick={() => {
              navigate("/companies");
            }}
          >
            Companies
          </p>{" "}
        </div>
        <div className="header-username">
          <p onClick={()=>{setLog(true)}}>{user?.user?.name ? user.user.name: "Login"}</p>{" "}
          {log ? (
            <p
              onClick={() => {
                setUser(undefined);
                localStorage.removeItem('user');
                 setLog(false);
              }}
            >
              Logout
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Header;
