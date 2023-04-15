import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGES, NO_MORE_MESSAGES } from "../reducers/users";
import { useEffect } from "react";
export default function MessageList() {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state) => state.currentChatId);
  const myId = useSelector((state) => state.myInfo.id);
  const currentChatUser = useSelector((state) => state.users[currentChatId]);
  const messages = useSelector((state) => state.users[currentChatId].messages);

  useEffect(() => {
    if (!messages.length < 50) fetchUserChat();
  });

  const fetchUserChat = async () => {
    try {
      if (currentChatUser.hasOwnProperty("noMoreMessages")) return;
      let skip = 0;
      if (currentChatUser.hasOwnProperty("messages"))
        skip = currentChatUser.messages.length;
      let response = await axios.get("/api/message", {
        withCredentials: true,
        params: {
          receiver_id: currentChatId.toString(),
          skip: skip,
        },
      });
      dispatch(ADD_MESSAGES({ id: currentChatId, data: response.data }));
      if (response.data.length < 50) dispatch(NO_MORE_MESSAGES(currentChatId));
    } catch (err) {
      console.log(err);
    }
  };

  const onScrollFetchChat = (e) => {
    if (
      Math.floor(
        e.currentTarget.clientHeight + -e.currentTarget.scrollTop + 1
      ) === e.currentTarget.scrollHeight
    )
      fetchUserChat();
  };

  const renderHelper = messages?.map((message, i) => {
    let receiver = false;
    let time = new Date(message.time_stamp);
    if (message.sender_id == myId) receiver = true;
    return (
      <li
        className={`bg-sky-600 rounded-b-lg mx-4 mb-2 py-2 px-4 last:mt-2 w-max max-w-md  ${
          receiver ? "self-end rounded-tl-lg" : "rounded-tr-lg"
        }`}
        key={i}
      >
        {message.msg}
        <p className="text-xs text-right">
          {time.toLocaleTimeString(message.time_stamp, {
            timeStyle: "short",
          })}
        </p>
      </li>
    );
  });

  return (
    <ul
      className="flex flex-col-reverse overflow-y-auto grow bg-black/25"
      onScroll={(e) => onScrollFetchChat(e)}
    >
      {renderHelper}
    </ul>
  );
}
