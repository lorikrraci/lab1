// Register.js
import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const { name, email, password } = user;

  const dispatch = useDispatch();
  const {
    errors,
    loading,
    isAuthenticated,
    user: registeredUser,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if registration was successful
    if (
      !loading &&
      registeredUser &&
      !errors.general &&
      !Object.keys(errors).length
    ) {
      setTimeout(() => {
        setIsRegistering(false);
        navigate("/register-success");
      }, 2000);
    }
    // Reset registering state if there are errors
    if (errors && Object.keys(errors).length > 0) {
      setIsRegistering(false);
    }
  }, [loading, errors, registeredUser, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    setIsRegistering(true);
    await dispatch(register(userData));
    // Navigation will now be handled in useEffect based on success
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    dispatch(clearErrors()); // Clear errors when user starts typing
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
      <div className="register-container">
        <div className="logo-overlay"></div>
        <div className="register-wrapper">
          <form className="register-form" onSubmit={submitHandler}>
            <h1 className="register-title">Create Account</h1>

            {isRegistering && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                  color: "#007bff",
                }}
              >
                Registering...
              </div>
            )}

            {errors.general && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "15px",
                  color: "red",
                }}
              >
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="e.g., John"
              />
              {errors.name && (
                <div
                  style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}
                >
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="e.g., john@gmail.com"
              />
              {errors.email && (
                <div
                  style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}
                >
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Min 8 characters"
              />
              {errors.password && (
                <div
                  style={{ color: "red", fontSize: "0.9rem", marginTop: "5px" }}
                >
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="register-button"
              disabled={loading || isRegistering}
            >
              REGISTER
            </button>

            <div className="form-group text-center">
              <p className="new-user-link">
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
