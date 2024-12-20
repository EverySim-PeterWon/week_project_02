import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
import LoadProject from "./pages/LoadProject";
import WorkBench from "./pages/WorkBench";
import Result from "./pages/SimResult";
import { MenuBarMain } from "./MenuBar";
import { MenuProvider } from "./MenuState";
import ProjectList from "./components/dbList";

function App() {
  const [isOpenProject, setIsOpenProject] = useState(true);
  const [isOpenResult, setIsOpenResult] = useState(true);

  return (
    <BrowserRouter>
      <MenuProvider>
        <MenuBarMain
          isOpenProject={isOpenProject}
          setIsOpenProject={setIsOpenProject}
          isOpenResult={isOpenResult}
          setIsOpenResult={setIsOpenResult}
        />
        <div>
          <Routes>
            <Route path="/test_page" element={<ProjectList />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/new_project"
              element={<NewProject setIsOpenProject={setIsOpenProject} />}
            />
            <Route
              path="/load_project"
              element={<LoadProject setIsOpenProject={setIsOpenProject} />}
            />
            <Route path="/workbench" element={<WorkBench />} />
            <Route path="/simulation_result" element={<Result />} />
          </Routes>
        </div>
      </MenuProvider>
    </BrowserRouter>
  );
}

export default App;
