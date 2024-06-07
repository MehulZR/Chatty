import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ADD_MESSAGES, NO_MORE_MESSAGES } from "../reducers/users";
import { useEffect } from "react";
import { messagesSchema } from "@/utils/validations";

export default function MessageList() {
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector((state) => state.currentChatId);
  const myId = useAppSelector((state) => state.myInfo.id);

  const currentChatUser = useAppSelector((state) =>
    currentChatId != null ? state.users[currentChatId] : null,
  );

  const messages = currentChatUser?.messages;

  useEffect(() => {
    void (async () => {
      if (!messages || messages.length < 50) await fetchUserChat();
    })();
  });

  const fetchUserChat = async () => {
    try {
      if (!currentChatUser || !currentChatId)
        throw new Error("Failed to fetch chat");
      if (currentChatUser?.noMoreMessage) return;
      const skip = messages?.length ? messages.length : 0;
      const response = await axios.get("/api/message", {
        withCredentials: true,
        params: {
          receiver_id: currentChatId.toString(),
          skip: skip,
        },
      });
      const parsedResponse = messagesSchema.safeParse(response.data);
      if (!parsedResponse.success) {
        throw new Error(parsedResponse.error.toString());
      }
      dispatch(ADD_MESSAGES({ id: currentChatId, data: parsedResponse.data }));
      if (parsedResponse.data.length < 50)
        dispatch(NO_MORE_MESSAGES(currentChatId));
    } catch (err) {
      console.error(err);
    }
  };

  const onScrollFetchChat = async (
    e: React.UIEvent<HTMLUListElement, UIEvent>,
  ) => {
    if (
      Math.floor(
        e.currentTarget.clientHeight + -e.currentTarget.scrollTop + 1,
      ) === e.currentTarget.scrollHeight
    )
      await fetchUserChat();
  };

  const renderHelper = messages?.map((message, i) => {
    let receiver = false;
    const time = new Date(message.created_at);
    if (message.sender_id == myId) receiver = true;
    return (
      <li
        className={`bg-sky-600 rounded-b-lg mx-4 mb-2 py-2 px-4 last:mt-2 w-max max-w-md  ${
          receiver ? "self-end rounded-tl-lg" : "rounded-tr-lg"
        }`}
        key={i}
      >
        {message.message}
        <p className="text-xs text-right">
          {time.toLocaleTimeString("en-US", {
            timeStyle: "short",
          })}
        </p>
      </li>
    );
  });

  return (
    <ul
      className="flex flex-col-reverse overflow-y-auto grow bg-black/25"
      onScroll={(e) => void onScrollFetchChat(e)}
    >
      {renderHelper}
    </ul>
  );
}
