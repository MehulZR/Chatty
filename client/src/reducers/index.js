import { combineReducers } from "redux";

const userReducer = (state = null, action) => {
  if (action.type === "USER_LOGIN") return action.payload;
  else if (action.type === "USER_LOGOUT") return null;
  else return state;
};

export default combineReducers({ user: userReducer });
