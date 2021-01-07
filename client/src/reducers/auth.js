import {
  REGISTER_SUCCESS,
  USER_LOADED,
  PROFILE_LOADED,
  UPDATE_PROFILE,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_USER,
  LOAD_USER,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  profile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        role: payload.role,
        name: payload.name,
        surname: payload.surname,
        avatar: payload.avatar,
        picture: payload.avatar,
        email: payload.email,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        role: payload.role,
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
      };
    case PROFILE_LOADED:
    case UPDATE_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: payload,
        picture: payload.picture,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        isAdmin: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        name: null,
        surname: null,
        role: null,
        profile: null,
        picture: null,
        avatar: null,
        email: null,
      };
    default:
      return state;
  }
}
