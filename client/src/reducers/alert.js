import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialSate = []; 

export default function(state = initialSate, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);

    default:
      return state;
  }
}
