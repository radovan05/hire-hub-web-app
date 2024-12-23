import React from "react";
import "./HomePage.css";
import { Navigate, useNavigate } from "react-router";
import IMG_URL from "../../resources/pictures/logo.png"

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage-main-div">
      <div className="info-right">
        <h1>
          <img src={IMG_URL} /> HireHub
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur
          provident ad accusamus iste. Aliquam sed enim consequuntur odio
          recusandae vitae odit.Aliquam sed enim consequuntur.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          consequuntur reiciendis consectetur exercitationem?
        </p>
      </div>
      <div className="info-left">
        <h1>Check out our Companies!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
          aut natus illum magni fugiat deserunt unde aperiam dolore. Libero
          optio placeat accusamus sit, explicabo ad.
        </p>
        <button
          onClick={() => {
            navigate("/companies");
          }}
        >
          Companies
        </button>
      </div>
    </div>
  );
};

export default HomePage;
