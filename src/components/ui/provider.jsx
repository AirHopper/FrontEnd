"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";

export function Provider({ children }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
