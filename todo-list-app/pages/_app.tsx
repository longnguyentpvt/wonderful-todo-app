import type { AppProps } from "next/app";
import ThemeProvider from "react-bootstrap/ThemeProvider";

import "@app/styles/main.scss";

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ThemeProvider
      breakpoints={ ["xxl", "desktop", "xl", "lg", "md", "sm", "xs"] }
      minBreakpoint="xs">
      <Component { ...pageProps } />
    </ThemeProvider>
  );
}
