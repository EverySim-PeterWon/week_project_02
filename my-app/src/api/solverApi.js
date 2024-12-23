import apiClient from "./api";

// Python Solver 실행
export const runSolver = async (projectId) => {
  const response = await apiClient.get("/solvers", {
    params: { projectId },
  });
  return response.data;
};
