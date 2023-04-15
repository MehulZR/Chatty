export default function SearchUser({
  setSearchUserQuery,
  searchUserLoading,
  searchUserQuery,
}) {
  let iconRenderHelper;
  if (searchUserLoading) {
    iconRenderHelper = [
      <svg
        className="flex-none p-1 w-9 h-9 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="none"
        stroke="#fff"
        strokeWidth="0"
        viewBox="-2.4 -2.4 28.8 28.8"
        key={1}
      >
        <g fill="#fff">
          <path
            fillRule="evenodd"
            d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            clipRule="evenodd"
            opacity="0.2"
          ></path>
          <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 00-7 7H2z"></path>
        </g>
      </svg>,
    ];
  } else if (searchUserQuery) {
    iconRenderHelper = [
      <svg
        className="flex-none p-1 cursor-pointer w-9 h-9"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="none"
        stroke="#fff"
        viewBox="0 0 24 24"
        onClick={() => setSearchQuery("")}
        key={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 8l-8 8m0-8l8 8"
        ></path>
      </svg>,
    ];
  } else {
    iconRenderHelper = [
      <svg
        className="flex-none p-1 w-9 h-9"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="#fff"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        clipRule="evenodd"
        viewBox="-6.4 -6.4 76.8 76.8"
        key={1}
      >
        <g>
          <path fill="none" d="M-640 -128H640V672H-640z"></path>
          <g>
            <path d="M39.94 44.142c-3.387 2.507 7.145-8.263 4.148-4.169.075-.006-.064.221-.53.79 0 0 8.004 7.95 11.933 11.996 1.364 1.475-1.097 4.419-2.769 2.882-3.558-3.452-11.977-12.031-11.99-12.045l-.792.546z"></path>
            <path
              fillRule="nonzero"
              d="M28.179 48.162c5.15-.05 10.248-2.183 13.914-5.806 4.354-4.303 6.596-10.669 5.814-16.747-1.34-10.415-9.902-17.483-19.856-17.483-7.563 0-14.913 4.731-18.137 11.591-2.468 5.252-2.473 11.593 0 16.854 3.201 6.812 10.431 11.518 18.008 11.591h.257zm-.236-3.337c-7.691-.074-14.867-6.022-16.294-13.648-1.006-5.376.893-11.194 4.849-15.012 4.618-4.459 11.877-5.952 17.913-3.425 5.4 2.261 9.442 7.511 10.187 13.295.638 4.958-1.141 10.154-4.637 13.733-3.067 3.14-7.368 5.014-11.803 5.057h-.215z"
            ></path>
          </g>
        </g>
      </svg>,
    ];
  }

  return (
    <div className="flex items-center flex-none mx-4 my-2 overflow-hidden rounded-lg bg-neutral-800">
      <input
        type="text"
        className="flex-1 w-0 py-2 pl-4 outline-none bg-neutral-800"
        placeholder="Search or Start a new chat"
        value={searchUserQuery}
        onChange={(e) => setSearchUserQuery(e.target.value)}
      ></input>
      {iconRenderHelper}
    </div>
  );
}
