import { configureStore } from "@reduxjs/toolkit";
import myInfo from "./reducers/myInfo";
import currentChatId from "./reducers/currentChatId";
import users from "./reducers/users";
import onlineUsers from "./reducers/onlineUsers";

export const store = configureStore({
  reducer: {
    myInfo,
    currentChatId,
    users,
    onlineUsers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
