import { getProject } from "../api/projectApi";

export async function ImportProjectData() {
  try {
    // const projectData = await fetchProjects();
    return await getProject();
  } catch (error) {
    console.error("Failed to import project data: ", error);
  }
}
