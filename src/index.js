import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { CanvasPropsContextProvider } from "./Context/CanvasPropsContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CanvasPropsContextProvider>
      <App />
    </CanvasPropsContextProvider>
  </StrictMode>
);
