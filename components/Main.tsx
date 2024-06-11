"use client";
import { useEffect } from "react";
import axios from "axios";
import Pusher, { Members as MembersTypes } from "pusher-js";
import Left from "../components/Left";
import Right from "../components/Right";
import ChatImage from "../components/ChatImage";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SET_INFO } from "../reducers/myInfo";
import { SET_CURRENT_CHAT_ID } from "../reducers/currentChatId";
import { ADD_NEW_MESSAGE, ADD_USERS } from "../reducers/users";
import { SET_USERS_ONLINE, SET_USERS_OFFLINE } from "../reducers/onlineUsers";
import Ajax from "pusher-js/types/src/core/http/ajax";
import { userSchema, usersSchema } from "@/utils/validations";

interface Message {
  sender_id: string;
  receiver_id: string;
  id: string;
  message: string;
  created_at: string;
}

interface Member {
  id: string;
  info: {
    name: string;
  };
}

export default function Main() {
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector((state) => state.currentChatId);
  const myId = useAppSelector((state) => state.myInfo.id);

  // Get My Details
  useEffect(() => {
    void (async () => {
      try {
        const response = await axios.get("/api/myDetails", {
          withCredentials: true,
        });

        const parsedResponse = userSchema.safeParse(response.data);

        if (!parsedResponse.success) {
          throw new Error(parsedResponse.error.toString());
        }

        dispatch(SET_INFO(parsedResponse.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  //Get Users
  useEffect(() => {
    void (async () => {
      try {
        const response = await axios.get("/api/users", {
          withCredentials: true,
        });

        const parsedResponse = usersSchema.safeParse(response.data);
        if (!parsedResponse.success) {
          throw new Error(parsedResponse.error.toString());
        }
        dispatch(ADD_USERS(parsedResponse.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  // Connect with Pusher
  useEffect(() => {
    if (!myId) return;
    try {
      if (
        !process.env.NEXT_PUBLIC_PUSHER_APP_KEY ||
        // !process.env.NEXT_PUBLIC_PUSHER_APP_HOST ||
        // !process.env.NEXT_PUBLIC_PUSHER_APP_PORT ||
        !process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER
      ) {
        throw new Error("Pusher Initialization Falied");
      }
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        //wsHost: process.env.NEXT_PUBLIC_PUSHER_APP_HOST,
        //wsPort: Number(process.env.NEXT_PUBLIC_PUSHER_APP_PORT),
        //wssPort: Number(process.env.NEXT_PUBLIC_PUSHER_APP_PORT),
        //forceTLS: true,
        //enabledTransports: ["ws", "wss"],

        userAuthentication: {
          endpoint: "/api/pusherUserAuth",
          transport: "ajax",
        },
        channelAuthorization: {
          endpoint: "/api/pusherAuth",
          transport: "ajax",
        },
      });

      Pusher.Runtime.createXHR = () => {
        const xhr = new XMLHttpRequest() as Ajax;
        xhr.withCredentials = true;
        return xhr;
      };

      const privateChannel = pusher.subscribe(`private-${myId}`);
      const presenceChannel = pusher.subscribe("presence-global");
      privateChannel.bind("message", (data: Message) => {
        dispatch(ADD_NEW_MESSAGE({ id: data.sender_id, data: data }));
      });
      presenceChannel.bind(
        "pusher:subscription_succeeded",
        (data: MembersTypes) => {
          const onlineUsersId = Object.keys(
            data.members as Record<string | number, object>,
          );
          dispatch(SET_USERS_ONLINE(onlineUsersId));
        },
      );
      presenceChannel.bind("pusher:member_added", (member: Member) => {
        dispatch(SET_USERS_ONLINE([member.id]));
      });
      presenceChannel.bind("pusher:member_removed", (member: Member) => {
        dispatch(SET_USERS_OFFLINE([member.id]));
      });
      return () => {
        pusher.unsubscribe(`private-${myId}`);
        pusher.unsubscribe("presence-global");
      };
    } catch (err) {
      console.error(err);
    }
  }, [myId, dispatch]);

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
