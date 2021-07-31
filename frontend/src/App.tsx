import React from "react";
import useWindowSize from "./Container/hooks/useWindowSize";
import ErrorPage from "./ErrorPage";
import { ThemeProvider } from "styled-components";
import theme from "./Container/globals/theme";
import Container from "./Container/Container";

function App() {
  const windowSize = useWindowSize();
  return windowSize.width !== undefined && windowSize.width < 986 ? (
    <ErrorPage />
  ) : (
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );
}

export default App;
