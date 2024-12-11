import React from "react";
import "./LogIn.css";
import { useState } from "react";
import { useAsyncError } from "react-router";

const LogIn = ({ setUser,login,setLogin }) => {
  const [pas, setPas] = useState("show");
  const [eye, setEye] = useState("fas fa-eye-slash");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

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
      .catch((er) => console.log(er));
  }
  function makeUser(data) {
    if (data.accessToken === "" || data.accessToken === undefined) {
      alert("Failed to login!");
    } else {
      alert("Successfully signed in!");
      setUser(data);
    }
  }
  
  return (
    <div className="login-body">
      <div className="login-main-div">
        <p className="login-main-text">Sign in </p>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          className={pas}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") LogIn();
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
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LogIn;
