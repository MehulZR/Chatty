"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { SET_INFO } from "@/reducers/myInfo";
import { SET_USERS_OFFLINE, SET_USERS_ONLINE } from "@/reducers/onlineUsers";
import { ADD_NEW_MESSAGE } from "@/reducers/users";
import { store } from "@/store";
import { userSchema } from "@/lib/validations";
import axios from "axios";
import Pusher, { Members as MembersTypes } from "pusher-js";
import Ajax from "pusher-js/types/src/core/http/ajax";
import { useEffect } from "react";
import { Provider } from "react-redux";

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

export function PusherProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();
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

  // Connect with Pusher
  useEffect(() => {
    if (!myId) return;
    try {
      if (
        !process.env.NEXT_PUBLIC_PUSHER_APP_KEY ||
        !process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER
      ) {
        throw new Error("Pusher Initialization Falied");
      }
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
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

  return children;
}

export function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
