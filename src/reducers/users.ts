import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Message {
  sender_id: string;
  id: string;
  message: string;
  receiver_id: string;
  created_at: string;
}
interface User {
  name: string;
  id: string;
  picture: string;
  messages?: Message[];
  noMoreMessage?: boolean;
}
interface UsersInitialState {
  [key: string | number]: User;
}
const initialState: UsersInitialState = {};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    ADD_USERS: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        state[user.id] = user;
      });
    },
    ADD_MESSAGES: (
      state,
      action: PayloadAction<{ id: string; data: Message[] }>
    ) => {
      const { id, data } = action.payload;
      if (!state[id].hasOwnProperty("messages")) state[id].messages = [];
      state[id].messages!.push(...data);
    },
    ADD_NEW_MESSAGE: (
      state,
      action: PayloadAction<{ id: string; data: Message }>
    ) => {
      const { id, data } = action.payload;
      if (!state[id].hasOwnProperty("messages")) state[id].messages = [];
      state[id].messages!.unshift(data);
    },
    NO_MORE_MESSAGES: (state, action: PayloadAction<string>) => {
      state[action.payload].noMoreMessage = true;
    },
  },
});

export const { ADD_USERS, ADD_MESSAGES, ADD_NEW_MESSAGE, NO_MORE_MESSAGES } =
  usersSlice.actions;
export default usersSlice.reducer;
