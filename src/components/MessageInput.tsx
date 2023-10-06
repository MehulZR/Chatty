import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import paperPlane from "../../public/paper-plane.svg";
import { ADD_NEW_MESSAGE } from "../reducers/users";
export default function MessageInput() {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const currentChatId = useAppSelector((state) => state.currentChatId);

  const sendMessage = async () => {
    if (!message) return;
    try {
      if (currentChatId === null)
        throw new Error("Current Chat Id is null, can't store message");

      const response = await axios.post(
        "/api/message",
        {
          receiver_id: currentChatId,
          msg: message,
        },
        { withCredentials: true }
      );
      dispatch(
        ADD_NEW_MESSAGE({
          id: currentChatId,
          data: response.data.data,
        })
      );
    } catch (err) {
      console.error(err);
    }
    setMessage("");
  };

  return (
    <div className="flex px-4 py-3">
      <input
        type="text"
        className="px-4 py-2 rounded-lg outline-none bg-neutral-800 grow"
        placeholder="Type a message"
        id="msg_input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      ></input>
      <button
        className="w-10 h-10 ml-4 overflow-hidden rounded-full bg-sky-600 "
        onClick={sendMessage}
      >
        <Image src={paperPlane} className="w-5 h-5 m-auto" alt="send"></Image>
      </button>
    </div>
  );
}
