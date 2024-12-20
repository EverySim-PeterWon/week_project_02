// src/components/ProjectList.js
import React, { useEffect, useState } from "react";
import apiClient from "../api";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // 백엔드 API 호출
    apiClient
      .get("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} (Created: {project.createAt})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
