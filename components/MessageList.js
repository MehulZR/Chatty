export default function MessageList({ Messages = [], fetchUserChat, myId }) {
  const onScrollFetchChat = (e) => {
    if (
      Math.floor(
        e.currentTarget.clientHeight + -e.currentTarget.scrollTop + 1
      ) === e.currentTarget.scrollHeight
    )
      fetchUserChat();
  };
  const renderHelper = Messages.map((message, i) => {
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
