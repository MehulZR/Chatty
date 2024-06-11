import { StoreProvider } from "@/providers";
import Main from "@/components/Main";

export default function Home() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
}
