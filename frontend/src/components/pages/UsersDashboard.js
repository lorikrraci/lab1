import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, updateUser, deleteUser } from "../../actions/userActions";

const UsersDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, users, usersLoading, loading, errors } =
    useSelector((state) => state.auth);

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      dispatch(getAllUsers());
    }
  }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(editUser.id, editUser));
    setEditUser(null);
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  // Helper function to render errors
  const renderErrors = () => {
    if (!errors || Object.keys(errors).length === 0) return null;

    // If errors is a string, display it directly
    if (typeof errors === "string") {
      return <p style={{ color: "red" }}>{errors}</p>;
    }

    // If errors is an object, map through its values
    return (
      <div style={{ color: "red" }}>
        {Object.values(errors).map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "100px 20px 20px", minHeight: "100vh" }}>
      <h2 style={{ color: "#A50304", marginBottom: "20px" }}>
        Users Management
      </h2>

      {usersLoading ? (
        <p>Loading users...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#A50304", color: "white" }}>
              <th style={{ padding: "10px" }}>ID</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Role</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{u.id}</td>
                <td style={{ padding: "10px" }}>
                  {editUser?.id === u.id ? (
                    <input
                      name="name"
                      value={editUser.name}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td style={{ padding: "10px" }}>
                  {editUser?.id === u.id ? (
                    <input
                      name="email"
                      value={editUser.email}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td style={{ padding: "10px" }}>
                  {editUser?.id === u.id ? (
                    <select
                      name="role"
                      value={editUser.role}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td style={{ padding: "10px" }}>
                  {editUser?.id === u.id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        style={{
                          marginRight: "5px",
                          backgroundColor: "#A50304",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                        }}
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditUser(null)}
                        style={{
                          backgroundColor: "#666",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(u)}
                        style={{
                          marginRight: "5px",
                          backgroundColor: "#A50304",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                        }}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {renderErrors()}
    </div>
  );
};

export default UsersDashboard;
