import { AuthContextProvider } from "context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Open Sans", sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
      <AuthContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            style: { fontSize: "1.2rem" },
          }}
        />
      </AuthContextProvider>
  );
}
