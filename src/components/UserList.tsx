import Image from "next/image";
import userImage from "../../public/user.svg";
interface User {
  name: string;
  id: string;
  picture: string;
}
interface UserListObject {
  [key: string | number]: User;
}
interface UserListProps {
  users: UserListObject;
  searchUserLoading: Boolean;
  setCurrentChatHelper: (id: string) => void;
}
export default function UserList({
  users,
  searchUserLoading,
  setCurrentChatHelper,
}: UserListProps) {
  let usersList = Object.values(users);
  let renderHelper: React.ReactElement[] = [];
  if (usersList.length) {
    renderHelper = usersList.map((user: User, i) => {
      return (
        <li
          className="flex items-center px-4 py-3 transition-colors hover:bg-neutral-800"
          key={i}
          onClick={() => setCurrentChatHelper(String(user.id))}
        >
          <Image
            src={user.picture || userImage}
            width={96}
            height={96}
            alt={`${user.name} pic`}
            className="w-8 h-8 rounded-full"
          ></Image>
          <span className="h-5 ml-4 truncate">{user.name}</span>
        </li>
      );
    });
  } else if (!searchUserLoading) {
    renderHelper = [
      <li className="px-4 py-3 text-center" key={1}>
        No User Found
      </li>,
    ];
  }
  return <ul className="flex flex-col overflow-y-auto grow">{renderHelper}</ul>;
}
