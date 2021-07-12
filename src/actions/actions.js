// Action Types:
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

// Actions:
// initialize the movies property
export function setMovies(value) {
  console.log("SET_MOVIES action triggered");
  return { type: SET_MOVIES, value };
}

// change the visibilityFilter property
export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  console.log("SET_USER action triggered");
  return { type: SET_USER, value };
}

export function updateUser(value) {
  console.log("UPDATE_USER action triggered");
  return { type: UPDATE_USER, value };
}
