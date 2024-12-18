import React, { createContext, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [isOpenProject, setIsOpenProject] = useState(true);
  const [isOpenResult, setIsOpenResult] = useState(true);

  return (
    <MenuContext.Provider
      value={{ isOpenProject, setIsOpenProject, isOpenResult, setIsOpenResult }}
    >
      {children}
    </MenuContext.Provider>
  );
}
