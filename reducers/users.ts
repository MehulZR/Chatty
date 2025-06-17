import { Omit } from "@prisma/client/runtime/library";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Message {
  sender_id: string;
  message: string;
  receiver_id: string;
  created_at: string;
  id: number;
}

export interface User {
  name: string;
  id: string;
  picture: string;
  messages: Message[];
  noMoreMessage: boolean;
}

type UsersInitialState = Record<string | number, User>;
const initialState: UsersInitialState = {};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    ADD_USERS: (
      state,
      action: PayloadAction<Omit<User, "messages" | "noMoreMessage">[]>,
    ) => {
      action.payload.forEach((user) => {
        state[user.id] = { ...user, messages: [], noMoreMessage: false };
      });
    },
    ADD_MESSAGES: (
      state,
      action: PayloadAction<{ id: string; data: Message[] }>,
    ) => {
      const { id, data } = action.payload;
      if (!Object.hasOwn(state[id], "messages")) state[id].messages = [];
      state[id].messages.push(...data);
    },
    ADD_NEW_MESSAGE: (
      state,
      action: PayloadAction<{ id: string; data: Message }>,
    ) => {
      const { id, data } = action.payload;
      if (!Object.hasOwn(state[id], "messages")) state[id].messages = [];
      state[id].messages.unshift(data);
    },
    NO_MORE_MESSAGES: (state, action: PayloadAction<string>) => {
      state[action.payload].noMoreMessage = true;
    },
  },
});

export const { ADD_USERS, ADD_MESSAGES, ADD_NEW_MESSAGE, NO_MORE_MESSAGES } =
  usersSlice.actions;
export default usersSlice.reducer;
