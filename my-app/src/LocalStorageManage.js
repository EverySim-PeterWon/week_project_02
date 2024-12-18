// import React from "react";

export function ProjectIdAuto() {
  const projectObj = JSON.parse(localStorage.getItem("project"));
  if (!projectObj || projectObj === null) {
    return 0;
  } else {
    const keysObj = Object.keys(projectObj);
    const IntKeys = keysObj.map((key) => parseInt(key, 10));
    return Math.max(...IntKeys) + 1;
  }
}

export function SetNewProjectData(project_id, project_name) {
  // Import project id and project name from localStorage
  let storedData = JSON.parse(localStorage.getItem("project"));
  const array_new = [project_name, Date.now(), project_id];

  function valid_project_data(storedData) {
    return (
      storedData === null ||
      (typeof storedData === "object" &&
        storedData[Object.keys(storedData)[0]].length === 1)
    );
  }

  if (valid_project_data(storedData)) {
    const objData = {};
    const key_new = [project_id];
    objData[key_new] = array_new;
    localStorage.setItem("project", JSON.stringify(objData));
  } else {
    storedData[project_id] = array_new;
    localStorage.setItem("project", JSON.stringify(storedData));
  }
}

export function CurrentProjectUpdate(id) {
  const ProjectInfo = JSON.parse(localStorage.getItem("project"));

  if (!ProjectInfo || !ProjectInfo[id]) {
    console.error("Project not found in localStorage");
    return;
  }

  const currentProjectInfo = ProjectInfo[parseInt(id)];
  const projectObj = {
    id: currentProjectInfo[2],
    project: currentProjectInfo[0],
  };
  localStorage.setItem("current_project", JSON.stringify(projectObj));
}

export function CurrentProjectLoad() {
  const ProjectInfo = JSON.parse(localStorage.getItem("current_project"));
  return ProjectInfo;
}

export function CurrentProjectRemove() {
  const currentProjObj = localStorage.getItem("current_project");
  if (currentProjObj) {
    localStorage.removeItem("current_project");
  } else {
    return;
  }
}
