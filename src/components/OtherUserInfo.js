import Image from "next/image";
import userImage from "../../public/user.svg";
import { useSelector } from "react-redux";
export default function OtherUserInfo() {
  const currentChatId = useSelector((state) => state.currentChatId);
  const name = useSelector((state) => state.users[currentChatId].name);
  const pictureURL = useSelector((state) => state.users[currentChatId].picture);
  const onlineStatus = useSelector((state) => state.onlineUsers[currentChatId]);
  return (
    <div className="flex items-center px-4 py-3">
      <Image
        src={pictureURL || userImage}
        className="w-10 h-10 overflow-hidden rounded-full"
        alt="user_image"
        width={40}
        height={40}
      ></Image>
      <div className="flex flex-col justify-center ml-2 ">
        <p className={onlineStatus ? "" : "text-lg"}>{name}</p>
        {onlineStatus ? <p className="text-xs">Online</p> : ""}
      </div>
    </div>
  );
}
