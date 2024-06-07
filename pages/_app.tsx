import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../store";
import { AppProps } from "next/app";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
