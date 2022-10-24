import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MovieContextProvider } from "../store/Movies-Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MovieContextProvider>
      <Component {...pageProps} />
    </MovieContextProvider>
  );
}

export default MyApp;
