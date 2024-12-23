// import { useEffect, useState } from "react";
import apiClient from "./api";

// Project 목록 조회(GET)
export const fetchProjects = async () => {
  try {
    const response = await apiClient.get("/projects");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch project: ", error);
  }
};

// Project 생성(POST)
export const createProject = async (newProject) => {
  try {
    const response = await apiClient.post("/projects", newProject);
    console.log("Project created successfully");
    console.log(response.json());
  } catch (error) {
    console.error("Failed to create project: ", error);
  }
};

// Project 삭제(DELETE)
export const deleteProject = async (projectId) => {
  try {
    await apiClient.delete(`/projects/${projectId}`);
    alert("Project deleted successfully");
  } catch (error) {
    console.error("Failed to delete project:", error);
  }
};

// Project 업데이트(PUT)
export const updateProject = async (projectId, updatedData) => {
  try {
    await apiClient.put(`/projects/${projectId}`, updatedData);
    alert("Project updated successfully");
  } catch (error) {
    console.error("Failed to update project:", error);
  }
};
