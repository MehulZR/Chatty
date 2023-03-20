import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import userImage from "../public/user.svg";
import Left from "@/components/Left";
import Right from "@/components/Right";
import ChatImage from "@/components/ChatImage";
export default function Main() {
  const [myName, setMyName] = useState("");
  const [myImage, setMyImage] = useState("");
  const [myId, setMyId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [searchUsers, setSearchUsers] = useState({});
  const [users, setUsers] = useState({});
  const [onlineUsers, setOnlineUsers] = useState({});
  const [searchUserLoading, setSearchUserLoading] = useState(false);
  const usersRef = useRef(users);

  useEffect(() => {
    usersRef.current = users;
  });
  // Get My Details
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/myDetails", {
          withCredentials: true,
        });
        setMyName(response.data.name);
        setMyImage(response.data.picture);
        setMyId(response.data.id);
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
        let tempUsers = {};
        response.data.forEach((user) => {
          tempUsers[user._id] = user;
        });
        setUsers(tempUsers);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // Connect with Pusher
  useEffect(() => {
    if (!myId) return;
    try {
      const pusher = new Pusher("1fbaf28182992e84c3e9", {
        cluster: "ap2",
        userAuthentication: {
          endpoint: "/api/pusherUserAuth",
        },
        channelAuthorization: {
          endpoint: "/api/pusherAuth",
        },
      });
      Pusher.Runtime.createXHR = () => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        return xhr;
      };
      const storePusherMessage = (data) => {
        if (!data.msg.length) return;
        let tempUsers = Object.assign({}, usersRef.current);
        if (!Object.hasOwnProperty.call(tempUsers[data.sender_id], "messages"))
          tempUsers[data.sender_id].messages = [];
        tempUsers[data.sender_id].messages.unshift(data);
        setUsers(tempUsers);
      };

      const privateChannel = pusher.subscribe(`private-${myId}`);
      const presenceChannel = pusher.subscribe("presence-global");
      privateChannel.bind("message", (data) => storePusherMessage(data));
      presenceChannel.bind("pusher:subscription_succeeded", (data) => {
        let tempOnlineUsers = Object.assign({}, onlineUsers);
        for (let user in data.members) tempOnlineUsers[user] = true;
        setOnlineUsers(tempOnlineUsers);
      });
      presenceChannel.bind("pusher:member_added", (member) => {
        let tempOnlineUsers = Object.assign({}, onlineUsers);
        tempOnlineUsers[member.id] = true;
        setOnlineUsers(tempOnlineUsers);
      });
      presenceChannel.bind("pusher:member_removed", (member) => {
        let tempOnlineUsers = Object.assign({}, onlineUsers);
        delete tempOnlineUsers[member.id];
        setOnlineUsers(tempOnlineUsers);
      });
      return () => {
        pusher.unsubscribe(`private-${myId}`);
        pusher.unsubscribe("presence-global");
      };
    } catch (err) {
      console.log(err);
    }
  }, [myId]);

  // Search Users
  useEffect(() => {
    if (!searchQuery) {
      setSearchUsers({});
      setSearchUserLoading(false);
    } else {
      if (!searchUserLoading) setSearchUserLoading(true);
      const fetch = async () => {
        try {
          const response = await axios.get("/api/users", {
            withCredentials: true,
            timeout: 2000,
            params: { query: searchQuery },
          });
          let tempSearchUsers = {};
          response.data.forEach((user) => {
            tempSearchUsers[user._id] = user;
          });
          setSearchUsers(tempSearchUsers);
        } catch (err) {
          console.log(err);
        }
        setSearchUserLoading(false);
      };
      const timer = setTimeout(fetch, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Fetch Chat Messages on current user change
  useEffect(() => {
    if (
      currentChat === null ||
      Object.hasOwnProperty.call(users[currentChat], "messages")
    )
      return;
    fetchUserChat();
  }, [currentChat]);

  const fetchUserChat = async () => {
    try {
      if (Object.hasOwnProperty.call(users[currentChat], "noMoreMessages"))
        return;
      let skip = 0;
      if (Object.hasOwnProperty.call(users[currentChat], "messages"))
        skip = users[currentChat].messages.length;
      let response = await axios.get("/api/message", {
        withCredentials: true,
        params: {
          receiver_id: users[currentChat]._id.toString(),
          skip: skip,
        },
      });
      let tempUsers = Object.assign({}, users);
      if (response.data.length < 50)
        tempUsers[currentChat].noMoreMessages = true;
      if (Object.hasOwnProperty.call(tempUsers[currentChat], "messages")) {
        tempUsers[currentChat].messages = [
          ...tempUsers[currentChat].messages,
          ...response.data,
        ];
      } else {
        tempUsers[currentChat].messages = response.data;
      }
      setUsers(tempUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async (msg) => {
    try {
      await axios.post(
        "/api/message",
        {
          receiver_id: users[currentChat]._id,
          msg: msg,
        },
        { withCredentials: true }
      );
      let time_stamp = Date.now();
      let tempUsers = Object.assign({}, users);
      if (!Object.hasOwnProperty.call(tempUsers[currentChat], "messages"))
        tempUsers[currentChat].messages = [];
      tempUsers[currentChat].messages.unshift({
        sender_id: myId,
        receiver_id: tempUsers[currentChat]._id,
        msg: msg,
        time_stamp: time_stamp,
      });
      setUsers(tempUsers);
    } catch (err) {
      console.log(err);
    }
  };

  const setCurrentChatHelper = (id) => {
    if (!Object.hasOwnProperty.call(users, id)) {
      let tempUsers = Object.assign({}, users);
      tempUsers[id] = searchUsers[id];
    }
    setCurrentChat(id);
  };
  return (
    <div
      className="flex h-screen text-gray-100 divide-x bg-neutral-900 divide-neutral-800"
      onKeyDownCapture={(e) => {
        if (e.key === "Escape") setCurrentChat(null);
      }}
      tabIndex={0}
    >
      <Left
        users={searchQuery ? searchUsers : users}
        myName={myName}
        myImage={myImage || userImage}
        setSearchQuery={setSearchQuery}
        setCurrentChatHelper={setCurrentChatHelper}
        searchUserLoading={searchUserLoading}
        searchQuery={searchQuery}
      />
      {currentChat === null ? (
        <ChatImage />
      ) : (
        <Right
          otherUserImage={users[currentChat].picture || userImage}
          otherUserName={users[currentChat].name}
          Messages={users[currentChat].messages}
          fetchUserChat={fetchUserChat}
          myId={myId}
          sendMessage={sendMessage}
          onlineStatus={onlineUsers[currentChat]}
        />
      )}
    </div>
  );
}
