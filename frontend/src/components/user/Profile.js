import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UPDATE_PROFILE_FAIL } from "../../constants/userConstants";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, errors } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: { general: "New password and confirmation do not match" },
      });
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
      };
      if (formData.newPassword) {
        updateData.oldPassword = formData.oldPassword;
        updateData.newPassword = formData.newPassword;
      }

      await dispatch(updateProfile(updateData));
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    dispatch(clearErrors());
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <div>You must be logged in to view your profile</div>;
  }

  return (
    <Fragment>
      <MetaData title={"Your Profile"} />
      <div style={{ padding: "100px 20px 20px", minHeight: "85vh" }}>
        <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info">
          <div className="col-12 col-md-3">
            <button
              onClick={toggleEditMode}
              id="edit_profile"
              className="btn btn-primary btn-block my-5"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="col-12 col-md-5">
            {editMode ? (
              <form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>
                <div className="form-group">
                  <h4>Full Name</h4>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>

                <div className="form-group">
                  <h4>Email Address</h4>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <h4>Old Password</h4>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter old password"
                    />
                    <span
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.oldPassword && (
                    <p style={{ color: "red" }}>{errors.oldPassword}</p>
                  )}
                </div>

                <div className="form-group">
                  <h4>New Password (optional)</h4>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter new password"
                    />
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.newPassword && (
                    <p style={{ color: "red" }}>{errors.newPassword}</p>
                  )}
                </div>

                <div className="form-group">
                  <h4>Confirm New Password</h4>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm new password"
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                  )}
                </div>

                {errors.general && (
                  <p style={{ color: "red" }}>{errors.general}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                  disabled={loading}
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <Fragment>
                <h4>Full Name</h4>
                <p>{user.name}</p>

                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>

                {user.role !== "admin" && (
                  <Link
                    to="/orders/me"
                    className="btn btn-danger btn-block mt-5"
                  >
                    My Orders
                  </Link>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
