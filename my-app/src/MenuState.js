import React, { createContext, useState, useContext } from "react";

// Context API를 이용해 필요한 상황에 따라 변수를 호출할 수 있도록 설정

export const MenuContext = createContext();
export const ProjectContext = createContext();

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

export function ProjectIdProvider({ children }) {
  const [projectId, setProjectId] = useState(null);

  return (
    <ProjectContext.Provider value={{ projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
}

//context 사용
export const useProject = () => {
  return useContext(ProjectContext);
};
