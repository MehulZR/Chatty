import MyInfo from "./MyInfo";
import SearchUser from "./SearchUser";
import UserList from "./UserList";
export default function Left({
  users,
  myImage,
  myName,
  setSearchQuery,
  setCurrentChatHelper,
  searchUserLoading,
  searchQuery,
}) {
  return (
    <div className="flex flex-col flex-none basis-80">
      <MyInfo myImage={myImage} myName={myName} />
      <div className="flex flex-col overflow-hidden grow">
        <SearchUser
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchUserLoading={searchUserLoading}
        />
        <UserList
          users={users}
          setCurrentChatHelper={setCurrentChatHelper}
          searchUserLoading={searchUserLoading}
        />
      </div>
    </div>
  );
}
