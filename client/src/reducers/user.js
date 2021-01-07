import {
  GET_USERS,
  DELETE_USER
} from "../actions/types";

const initialState = {
  users: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
