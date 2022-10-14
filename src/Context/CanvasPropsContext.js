import { createContext, useState } from "react";

export const CanvasPropsContext = createContext();

export const CanvasPropsContextProvider = ({ children }) => {
  const [padding, setPadding] = useState({
    x: 0,
    y: 0,
  });

  return (
    <CanvasPropsContext.Provider value={{ padding, setPadding }}>
      {children}
    </CanvasPropsContext.Provider>
  );
};
