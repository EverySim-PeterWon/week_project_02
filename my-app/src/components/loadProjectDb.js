import { getProject } from "../api/projectApi";

export function ImportProjectData() {
  const projectData = getProject();
  console.log(projectData);
}
