// Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  if (!isAuthenticated || user?.role !== "admin") {
    navigate("/");
    return null;
  }

  return (
    <div
      style={{
        width: "100vw",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#A50304",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          margin: 0,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/KB-Vellaznimi-logo.png`}
            alt="KB Vëllaznimi"
            style={{ height: "50px", marginRight: "10px" }}
          />
          <h1
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            KB VËLLAZNIMI
          </h1>
        </Link>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link
            to="#"
            onClick={handleLogout}
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Logout
          </Link>
        </nav>
      </header>

      {/* Dashboard Content */}
      <div
        style={{
          width: "100%",
          margin: 0,
          padding: "100px 20px 20px 20px",
          boxSizing: "border-box",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#A50304",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Welcome to the Dashboard
        </h3>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            padding: "0 20px",
          }}
        >
          {/* Orders Card */}
          <Link
            to="/dashboard/orders"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 style={{ margin: 0, color: "#A50304" }}>Orders</h3>
              <p style={{ margin: "10px 0 0 0", color: "#666" }}>
                Manage all orders from here.
              </p>
            </div>
          </Link>

          {/* Products Card */}
          <Link
            to="/dashboard/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 style={{ margin: 0, color: "#A50304" }}>Products</h3>
              <p style={{ margin: "10px 0 0 0", color: "#666" }}>
                Manage all products from here.
              </p>
            </div>
          </Link>

          {/* Users Card */}
          <Link
            to="/dashboard/users"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h3 style={{ margin: 0, color: "#A50304" }}>Users</h3>
              <p style={{ margin: "10px 0 0 0", color: "#666" }}>
                Manage all users from here.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
