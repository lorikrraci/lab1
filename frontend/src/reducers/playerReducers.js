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
  
  export const playerReducer = (state = { players: [] }, action) => {
    switch (action.type) {
      case ALL_PLAYERS_REQUEST:
      case CREATE_PLAYER_REQUEST:
      case UPDATE_PLAYER_REQUEST:
      case DELETE_PLAYER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_PLAYERS_SUCCESS:
        return {
          loading: false,
          players: action.payload.players,
          playerCount: action.payload.totalPlayers,
          resPerPage: action.payload.resPerPage,
          totalPages: action.payload.totalPages,
        };
      case CREATE_PLAYER_SUCCESS:
        return {
          ...state,
          loading: false,
          players: [action.payload, ...state.players], // Add new player to the beginning
        };
      case UPDATE_PLAYER_SUCCESS:
        return {
          ...state,
          loading: false,
          players: state.players.map((player) =>
            player.id === action.payload.id ? action.payload : player
          ),
        };
      case DELETE_PLAYER_SUCCESS:
        return {
          ...state,
          loading: false,
          players: state.players.filter((player) => player.id !== action.payload),
        };
      case ALL_PLAYERS_FAIL:
      case CREATE_PLAYER_FAIL:
      case UPDATE_PLAYER_FAIL:
      case DELETE_PLAYER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const playerDetailsReducer = (state = { player: {} }, action) => {
    switch (action.type) {
      case PLAYER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case PLAYER_DETAILS_SUCCESS:
        return {
          loading: false,
          player: action.payload,
        };
      case PLAYER_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };