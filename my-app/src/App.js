import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
import LoadProject from "./pages/LoadProject";
import WorkBench from "./pages/WorkBench";
import { Result } from "./pages/Result";
import { MenuBarMain } from "./pages/MenuBar";
import { MenuProvider, ProjectIdProvider } from "./MenuState";

function App() {
  const [isOpenProject, setIsOpenProject] = useState(true);
  const [isOpenResult, setIsOpenResult] = useState(true);

  return (
    <BrowserRouter>
      <ProjectIdProvider>
        <MenuProvider>
          <MenuBarMain
            isOpenProject={isOpenProject}
            setIsOpenProject={setIsOpenProject}
            isOpenResult={isOpenResult}
            setIsOpenResult={setIsOpenResult}
          />
          <div>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route
                path="/new-project"
                element={<NewProject setIsOpenProject={setIsOpenProject} />}
              />
              <Route
                path="/load-project"
                element={<LoadProject setIsOpenProject={setIsOpenProject} />}
              />
              <Route path="/workbench" element={<WorkBench />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </div>
        </MenuProvider>
      </ProjectIdProvider>
    </BrowserRouter>
  );
}

export default App;
