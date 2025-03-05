import axios from "axios";

import {
  ALL_PLAYERS_REQUEST,
  ALL_PLAYERS_SUCCESS,
  ALL_PLAYERS_FAIL,
  PLAYER_DETAILS_REQUEST,
  PLAYER_DETAILS_SUCCESS,
  PLAYER_DETAILS_FAIL,
  CREATE_PLAYER_REQUEST,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAIL,
  UPDATE_PLAYER_REQUEST,
  UPDATE_PLAYER_SUCCESS,
  UPDATE_PLAYER_FAIL,
  DELETE_PLAYER_REQUEST,
  DELETE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAIL,
  CLEAR_ERRORS,
} from "../constants/playerConstants";

const BASE_URL = "http://localhost:5000/api/v1";

// Get all players
export const getPlayers =
  (
    keyword = "",
    position = "",
    jerseyRange = [0, 99],
    sort = "id ASC",
    page = 1,
    limit = 6
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PLAYERS_REQUEST });

      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(
        `${BASE_URL}/players?page=${page}&limit=${limit}&keyword=${keyword}&position=${position}&jerseyRange=${JSON.stringify(
          jerseyRange
        )}&sort=${sort}`,
        config
      );

      dispatch({
        type: ALL_PLAYERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PLAYERS_FAIL,
        payload: error.response?.data?.error || "Error fetching players",
      });
    }
  };

// Get player details by ID
export const getPlayerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLAYER_DETAILS_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`${BASE_URL}/players/${id}`, config);

    dispatch({
      type: PLAYER_DETAILS_SUCCESS,
      payload: data.player,
    });
  } catch (error) {
    dispatch({
      type: PLAYER_DETAILS_FAIL,
      payload: error.response?.data?.error || "Error fetching player",
    });
  }
};

// Create a new player
export const createPlayer = (playerData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PLAYER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/players`,
      playerData,
      config
    );

    dispatch({
      type: CREATE_PLAYER_SUCCESS,
      payload: data.player,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PLAYER_FAIL,
      payload: error.response?.data?.error || "Error creating player",
    });
  }
};

// Update a player
export const updatePlayer = (id, playerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PLAYER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/players/${id}`,
      playerData,
      config
    );

    dispatch({
      type: UPDATE_PLAYER_SUCCESS,
      payload: data.player,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PLAYER_FAIL,
      payload: error.response?.data?.error || "Error updating player",
    });
  }
};

// Delete a player
export const deletePlayer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PLAYER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios.delete(`${BASE_URL}/players/${id}`, config);

    dispatch({
      type: DELETE_PLAYER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAYER_FAIL,
      payload: error.response?.data?.error || "Error deleting player",
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
