import "../../styles/globals.css";
import { Inter } from "@next/font/google";
import { Provider } from "react-redux";
import store from "../store";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
