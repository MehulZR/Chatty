import { createSlice } from "@reduxjs/toolkit";
const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    ADD_USERS: (state, action) => {
      action.payload.forEach((user) => {
        state[user._id] = user;
      });
    },
    ADD_MESSAGES: (state, action) => {
      const { id, data } = action.payload;
      if (!state[id].hasOwnProperty("messages")) state[id].messages = [];
      state[id].messages.push(...data);
    },
    ADD_NEW_MESSAGE: (state, action) => {
      const { id, data } = action.payload;
      if (!state[id].hasOwnProperty("messages")) state[id].messages = [];
      state[id].messages.unshift(data);
    },
    NO_MORE_MESSAGES: (state, action) => {
      state[action.payload].noMoreMessage = true;
    },
  },
});

export const {
  ADD_USERS,
  ADD_MESSAGES,
  ADD_NEW_MESSAGE,
  DELETE_MESSAGES,
  NO_MORE_MESSAGES,
} = usersSlice.actions;
export default usersSlice.reducer;
