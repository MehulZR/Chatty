import { useState, useEffect } from "react";
import SignIn from "@/components/SignIn";
import Main from "@/components/Main";
import Head from "next/head";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].match(/LoggedIn=.*/)) {
        if (!loggedIn) setLoggedIn(true);
        return;
      }
    }
    if (loggedIn === true) setLoggedIn(false);
  });
  return (
    <>
      <Head>
        <title>Chatty</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0088af" />
        <meta name="msapplication-TileColor" content="#9f00a7" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {loggedIn ? <Main /> : <SignIn />}
    </>
  );
}
