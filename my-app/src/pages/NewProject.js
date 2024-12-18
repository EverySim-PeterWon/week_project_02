import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProjectIdAuto,
  SetNewProjectData,
  CurrentProjectUpdate,
} from "../LocalStorageManage";

function NewProject({ setIsOpenProject }) {
  const navigate = useNavigate();

  const [projectId] = useState(() => ProjectIdAuto());
  const [projectName, setProjectName] = useState("");

  // Checking the vacant of input
  const [isVacant, setIsVacant] = useState(true);

  // Define action when click "BACK" button
  const handleBackClick = () => {
    navigate("/home");
  };

  // Define action when click "MAKE" button
  const handleMakeClick = () => {
    SetNewProjectData(projectId, projectName);
    CurrentProjectUpdate(projectId);
    setIsOpenProject(false);
    navigate("/workbench");
  };

  // Define handle function of input at project name
  const handleNewInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value.trim();
    setProjectName(value);
    setIsVacant(value === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMakeClick();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button onClick={handleBackClick}>BACK</button>

        <h1>NEW PROJECT</h1>

        {isVacant && <p style={{ color: "red" }}>FILL THE NAME!</p>}

        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="inputid">PROJECT ID</label>
          <input id="inputid" type="number" value={projectId} disabled />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="inputProjName">PROJECT NAME</label>
          <input
            id="inputProjName"
            placeholder="Input project name"
            type="text"
            value={projectName}
            onChange={handleNewInputChange}
          />
        </div>
        <button type="submit" disabled={isVacant}>
          MAKE PROJECT
        </button>
      </form>
    </div>
  );
}

export default NewProject;
