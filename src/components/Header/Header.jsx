import React from "react";
import "./Header.css";
import { Navigate, useNavigate } from "react-router";
import { useState } from "react";

const Header = ({ user, setUser,login ,setLogin }) => {
  const [log,setLog] = useState(false);
  const navigate = useNavigate();
  let classSelectedHome;
  let classSelectedCompanies;
  if(login===false){
    alert("Ur session is expired pls Login again.")
    setUser(undefined);
    localStorage.removeItem("user");
    
  }
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
          <p
            onClick={() => {
              setLog(!log);
            }}
          >
            {user?.user?.name ? user.user.name : "Login"}
          </p>{" "}
          {log ? (
            <>
              {" "}
              <p> | </p>{" "}
              <p
                className="header-signout-selected"
                onClick={() => {
                  setUser(undefined);
                  localStorage.removeItem("user");
                  setLog(false);
                  navigate('/')
                }}
              >
                Sign out
              </p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Header;
