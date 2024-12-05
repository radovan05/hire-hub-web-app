import React from "react";
import "./LogIn.css";
import { useState } from "react";
import { useAsyncError } from "react-router";

const LogIn = ({setUser}) => {
  const [pas, setPas] = useState("show");
  const [eye, setEye] = useState("fas fa-eye-slash");
  const [username, setUsername]= useState("");
  const [pass,setPass]=useState("");  
 
  function LogIn() {
   
    fetch(`http://localhost:3333/login`, {
      method: "POST",
      body: JSON.stringify({
        email: username,
        password: pass,
      }),
      headers: {
        "Content-Type": " application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => makeUser(data))
      .catch((er) => console.log(er))
      
  }
  function makeUser(data){ 
    if(data.accessToken==="" || data.accessToken===undefined){
      alert("Failed to login!");
    }
    else{ 
      alert("Sucessfuly loged in!");
      setUser(data);
    }
  }
  return (
    <div className="login-body">
      <div className="login-main-div">
        <p className="login-main-text">Login </p>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => {
            setUsername(e.target.value)
         
          }}
        />
        <input
          type="text"
          placeholder="Password"
          className={pas}
          onChange={(e) => {
            setPass( e.target.value);
            
          }}
        />
        <button
          className="toggle-password"
          onClick={() => {
            if (eye === "fas fa-eye") {
              setEye("fas fa-eye-slash");
              setPas("show");
            } else if (eye === "fas fa-eye-slash") {
              setEye("fas fa-eye");
              setPas("");
            }
          }}
        >
          <i id="toggleIcon" className={eye}></i>
        </button>
        <button
          onClick={() => {
            LogIn();
            
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LogIn;
