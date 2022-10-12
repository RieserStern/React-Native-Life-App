import React from "react";
import { Provider } from "react-redux";
import { store } from "./stores";
import { Navigator } from "./infrastructures/navigation";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./infrastructures/theme";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
