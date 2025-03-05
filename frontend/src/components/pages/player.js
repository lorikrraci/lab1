import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  clearErrors,
} from "../../actions/playerAction"; // Adjusted path for src/components/pages/
import Loader from "../layout/Loader"; // Adjusted path
import { toast } from "react-toastify";

const Players = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, players, error } = useSelector((state) => state.player);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [editPlayerId, setEditPlayerId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    first_name: "",
    last_name: "",
    position: "",
    jersey_number: "",
    height: "",
    weight: "",
    birth_date: "",
  });
  const [editPlayer, setEditPlayer] = useState({});

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
      return;
    }
    dispatch(getPlayers());
  }, [dispatch, isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const handleCreateToggle = () => {
    setShowCreateForm(!showCreateForm);
    setNewPlayer({
      first_name: "",
      last_name: "",
      position: "",
      jersey_number: "",
      height: "",
      weight: "",
      birth_date: "",
    });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({
      ...newPlayer,
      [name]:
        name === "jersey_number" || name === "height" || name === "weight"
          ? Number(value)
          : value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPlayer(newPlayer));
      setShowCreateForm(false);
      dispatch(getPlayers());
      toast.success("Player created successfully!");
    } catch (err) {
      toast.error("Failed to create player");
    }
  };

  const handleEdit = (player) => {
    setEditPlayerId(player.id);
    setEditPlayer({ ...player });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePlayer(editPlayerId, editPlayer));
      setEditPlayerId(null);
      dispatch(getPlayers());
      toast.success("Player updated successfully!");
    } catch (err) {
      toast.error("Failed to update player");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await dispatch(deletePlayer(id));
        dispatch(getPlayers());
        toast.success("Player deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete player");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPlayer({
      ...editPlayer,
      [name]:
        name === "jersey_number" || name === "height" || name === "weight"
          ? Number(value)
          : value,
    });
  };

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div style={{ padding: "100px 20px 20px", minHeight: "100vh" }}>
      <h1 style={{ color: "#A50304", marginBottom: "20px" }}>
        Players Dashboard
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {showCreateForm && (
            <div
              style={{
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h2 style={{ color: "#A50304" }}>Add New Player</h2>
              <form onSubmit={handleCreateSubmit}>
                <div style={{ marginBottom: "10px" }}>
                  <label>First Name: </label>
                  <input
                    name="first_name"
                    value={newPlayer.first_name}
                    onChange={handleCreateChange}
                    required
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Last Name: </label>
                  <input
                    name="last_name"
                    value={newPlayer.last_name}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Position: </label>
                  <input
                    name="position"
                    value={newPlayer.position}
                    onChange={handleCreateChange}
                    required
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Jersey Number: </label>
                  <input
                    name="jersey_number"
                    type="number"
                    value={newPlayer.jersey_number}
                    onChange={handleCreateChange}
                    required
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Height (cm): </label>
                  <input
                    name="height"
                    type="number"
                    value={newPlayer.height}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Weight (kg): </label>
                  <input
                    name="weight"
                    type="number"
                    value={newPlayer.weight}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Birth Date: </label>
                  <input
                    name="birth_date"
                    type="date"
                    value={newPlayer.birth_date}
                    onChange={handleCreateChange}
                    style={{ width: "100%", padding: "5px" }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#A50304",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "10px",
                  }}
                  disabled={loading}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={handleCreateToggle}
                  style={{
                    backgroundColor: "#666",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#A50304", color: "#fff" }}>
                  <th style={{ padding: "10px" }}>ID</th>
                  <th style={{ padding: "10px" }}>First Name</th>
                  <th style={{ padding: "10px" }}>Last Name</th>
                  <th style={{ padding: "10px" }}>Position</th>
                  <th style={{ padding: "10px" }}>Jersey #</th>
                  <th style={{ padding: "10px" }}>Height</th>
                  <th style={{ padding: "10px" }}>Weight</th>
                  <th style={{ padding: "10px" }}>Birth Date</th>
                  <th style={{ padding: "10px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players && players.length > 0 ? (
                  players.map((player) => (
                    <tr
                      key={player.id}
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <td style={{ padding: "10px" }}>{player.id}</td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <input
                            name="first_name"
                            value={editPlayer.first_name}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          player.first_name
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <input
                            name="last_name"
                            value={editPlayer.last_name || ""}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          player.last_name || "N/A"
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <input
                            name="position"
                            value={editPlayer.position}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          player.position
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <input
                            name="jersey_number"
                            type="number"
                            value={editPlayer.jersey_number}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          player.jersey_number
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <input
                            name="height"
                            type="number"
                            value={editPlayer.height || ""}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          player.height || "N/A"
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <input
                            name="weight"
                            type="number"
                            value={editPlayer.weight || ""}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          player.weight || "N/A"
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <input
                            name="birth_date"
                            type="date"
                            value={editPlayer.birth_date || ""}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        ) : player.birth_date ? (
                          new Date(player.birth_date).toLocaleDateString()
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td style={{ padding: "10px" }}>
                        {editPlayerId === player.id ? (
                          <>
                            <button
                              onClick={handleUpdate}
                              style={{
                                backgroundColor: "#4CAF50",
                                color: "#fff",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditPlayerId(null)}
                              style={{
                                backgroundColor: "#666",
                                color: "#fff",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(player)}
                              style={{
                                backgroundColor: "#FFA500",
                                color: "#fff",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "5px",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(player.id)}
                              style={{
                                backgroundColor: "#f44336",
                                color: "#fff",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      style={{ padding: "20px", textAlign: "center" }}
                    >
                      No players found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isAuthenticated && user?.role === "admin" && (
            <button
              style={{
                position: "fixed",
                bottom: "80px",
                right: "20px",
                backgroundColor: "#A50304",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                fontSize: "24px",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
              }}
              onClick={handleCreateToggle}
            >
              +
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Players;
