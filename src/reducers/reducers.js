import { combineReducers } from "redux";

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  UPDATE_USER,
} from "../actions/actions";

// initilize state to empty string, pass in action
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

// initialize state to empty array, pass in action
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log("SET_MOVIES reducer reached");
      return action.value;
    default:
      return state;
  }
}

function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      console.log("SET_USER reducer reached");
      return action.value;
    case UPDATE_USER:
      console.log("UPDATE_USER reducer reached");
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
});

export default moviesApp;
