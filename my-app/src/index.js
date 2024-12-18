import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
let root;

if (!rootElement._reactRootContainer) {
  root = createRoot(rootElement);
} else {
  root = rootElement._reactRootContainer._internalRoot.current;
}

root.render(<App />);
