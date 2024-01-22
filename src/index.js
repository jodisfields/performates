import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import App from "./App";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
