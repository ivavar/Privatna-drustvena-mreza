import axios from "axios";
import { setAlert } from "./alert";

import {
  PROFILE_ERROR,
  GET_USERS,
  DELETE_USER,
  UPDATE_USER,
  GET_USER,
} from "./types";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/users");
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Jeste li sigurni da želite izbrisati korisnika, njegov profil i objave?"
    )
  ) {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
      dispatch(setAlert("Korisnik je izbrisan.", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const changeAccountSettings = (formData, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/auth/settings", formData, config);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
