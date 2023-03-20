import Image from "next/image";
import { useState } from "react";
import paperPlane from "../public/paper-plane.svg";
export default function MessageInput({ sendMessage }) {
  const [msg, setMsg] = useState("");
  const onSendClick = () => {
    if (msg) {
      sendMessage(msg);
      setMsg("");
    }
  };
  return (
    <div className="flex px-4 py-3">
      <input
        type="text"
        className="px-4 py-2 rounded-lg outline-none bg-neutral-800 grow"
        placeholder="Type a message"
        id="msg_input"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSendClick();
        }}
      ></input>
      <button
        className="w-10 h-10 ml-4 overflow-hidden rounded-full bg-sky-600 "
        onClick={onSendClick}
      >
        <Image src={paperPlane} className="w-5 h-5 m-auto" alt="send"></Image>
      </button>
    </div>
  );
}
