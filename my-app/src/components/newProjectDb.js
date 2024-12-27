import { createProject } from "../api/projectApi";

export function ProjectIdAuto(projectData) {
  if (!projectData || projectData === null || projectData.length === 0) {
    return 0;
  } else {
    const IntKeys = projectData.map((project) => project.id);
    return Math.max(...IntKeys) + 1;
  }
}

export function SetNewProjectData(project_name) {
  const newProjectObject = {
    name: project_name,
    elements: [],
    vertices: [],
  };

  createProject(newProjectObject);
}
