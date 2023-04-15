import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Left from "@/src/components/Left";
import Right from "@/src/components/Right";
import ChatImage from "@/src/components/ChatImage";
import { useDispatch, useSelector } from "react-redux";
import { SET_INFO } from "../reducers/myInfo";
import { SET_CURRENT_CHAT_ID } from "../reducers/currentChatId";
import { ADD_NEW_MESSAGE, ADD_USERS } from "../reducers/users";
import { SET_USERS_ONLINE, SET_USERS_OFFLINE } from "../reducers/onlineUsers";

export default function Main() {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state) => state.currentChatId);
  const myId = useSelector((state) => state.myInfo.id);

  // Get My Details
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/myDetails", {
          withCredentials: true,
        });
        dispatch(SET_INFO(response.data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  //Get Users
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/users", {
          withCredentials: true,
        });
        dispatch(ADD_USERS(response.data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // Connect with Pusher
  useEffect(() => {
    if (!myId) return;
    try {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: "",
        wsHost: process.env.NEXT_PUBLIC_PUSHER_APP_HOST,
        wsPort: process.env.NEXT_PUBLIC_PUSHER_APP_PORT,
        wssPort: process.env.NEXT_PUBLIC_PUSHER_APP_PORT,
        forceTLS: true,
        enabledTransports: ["ws", "wss"],
        userAuthentication: {
          endpoint: "/api/pusherUserAuth",
        },
        channelAuthorization: {
          endpoint: "/api/pusherAuth",
        },
      });
      Pusher.log = (msg) => console.log(msg);
      Pusher.Runtime.createXHR = () => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        return xhr;
      };
      const storePusherMessage = (data) => {
        if (!data.msg.length) return;
        dispatch(ADD_NEW_MESSAGE({ id: data.sender_id, data: data }));
      };
      const privateChannel = pusher.subscribe(`private-${myId}`);
      const presenceChannel = pusher.subscribe("presence-global");
      privateChannel.bind("message", (data) => storePusherMessage(data));
      presenceChannel.bind("pusher:subscription_succeeded", (data) => {
        const onlineUsersId = Object.keys(data.members);
        dispatch(SET_USERS_ONLINE(onlineUsersId));
      });
      presenceChannel.bind("pusher:member_added", (member) => {
        dispatch(SET_USERS_ONLINE([member.id]));
      });
      presenceChannel.bind("pusher:member_removed", (member) => {
        dispatch(SET_USERS_OFFLINE([member.id]));
      });
      return () => {
        pusher.unsubscribe(`private-${myId}`);
        pusher.unsubscribe("presence-global");
      };
    } catch (err) {
      console.log(err);
    }
  }, [myId]);

  return (
    <div
      className="flex h-screen text-gray-100 divide-x bg-neutral-900 divide-neutral-800"
      onKeyDownCapture={(e) => {
        if (e.key === "Escape") dispatch(SET_CURRENT_CHAT_ID(null));
      }}
      tabIndex={0}
    >
      <Left />
      {currentChatId === null ? <ChatImage /> : <Right />}
    </div>
  );
}
