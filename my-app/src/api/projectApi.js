// import { useEffect, useState } from "react";
import apiClient from "./api";

// Project 생성(POST)
export const createProject = async (newProject) => {
  try {
    await apiClient.post("/projects", newProject);
    console.log("Project created successfully");
  } catch (error) {
    console.error("Failed to create project: ", error);
  }
};

// Project 가져오기(GET)
export const getProject = async () => {
  try {
    const response = await apiClient.get("/projects");
    console.log("Project data import finished!");
    return response.data;
  } catch (error) {
    console.error("Failed to get project: ", error);
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

// Project 삭제(DELETE)
export const deleteProject = async (projectId) => {
  try {
    await apiClient.delete(`/projects/${projectId}`);
    alert("Project deleted successfully");
  } catch (error) {
    console.error("Failed to delete project:", error);
  }
};
