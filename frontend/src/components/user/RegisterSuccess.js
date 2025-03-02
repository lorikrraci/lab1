// src/components/user/RegisterSuccess.js
import React from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./RegisterSuccess.css";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="register-success-container">
      <MetaData title="Registration Successful" />
      <div className="success-wrapper">
        <h1 className="success-title">Registration Successful!</h1>
        <p className="success-message">
          User is registered successfully and can continue browsing on our page!
        </p>
        <div className="button-group">
          <button onClick={handleReturnHome} className="home-button">
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
