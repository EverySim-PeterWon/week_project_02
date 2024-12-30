import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProject } from "../api/projectApi";
import { ProjectIdAuto, SetNewProjectData } from "../components/newProjectDb";

// Project 테이블 데이터 가져오기
const projectData = await getProject();

function NewProject({ setIsOpenProject, setProjectId }) {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const projectId = ProjectIdAuto(projectData);

  // Checking the vacant of input
  const [isVacant, setIsVacant] = useState(true);

  // Define action when click "BACK" button
  const handleBackClick = () => {
    navigate("/home");
  };

  // Define action when click "MAKE" button
  const handleMakeClick = () => {
    SetNewProjectData(projectName);
    setIsOpenProject(false);
    navigate("/workbench");
    setProjectId(projectId);
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
