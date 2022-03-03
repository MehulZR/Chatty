export const USER_LOGIN = (user) => {
  return {
    type: "USER_LOGIN",
    payload: {
      name: user.name,
      id: user.id,
      pictureUrl: user.picture,
    },
  };
};

export const USER_LOGOUT = () => {
  console.log("user logout called");
  document.cookie =
    "Account-LoggedIn= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  return { type: "USER_LOGOUT" };
};
