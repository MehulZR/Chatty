import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import OtherUserInfo from "./OtherUserInfo";
export default function Right({
  otherUserImage,
  otherUserName,
  Messages,
  fetchUserChat,
  myId,
  sendMessage,
  onlineStatus,
}) {
  return (
    <div className="flex flex-col grow">
      <OtherUserInfo
        otherUserImage={otherUserImage}
        otherUserName={otherUserName}
        onlineStatus={onlineStatus}
      />
      <MessageList
        Messages={Messages}
        fetchUserChat={fetchUserChat}
        myId={myId}
      />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}
