import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import { spawn } from "child_process";
import path from "path";

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(
  cors({
    // frontend domain
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// GET: 모든 프로젝트 목록 조회
app.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        vertices: true,
        elements: true,
      },
    });
    res.json(projects);
  } catch (err) {
    console.error("Database query error:", err);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// GET: Python script 실행
// input: projectId
app.get("/solvers", (req, res) => {
  const projectId = req.query.projectId;

  if (!projectId) {
    return res.status(400).json({ error: "Project ID is required!" });
  }

  const solverPath = path.join(__dirname, "script/euler_equation.py");
  // Python 실행
  const pythonProcess = spawn("python", [solverPath, projectId]);

  let filePath = "";

  // Python stdout에서 파일 경로 수신
  pythonProcess.stdout.on("data", (data) => {
    filePath = data.toString().trim();
    console.log(`Solver Output (File Path): ${filePath}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Solver finished successfully");
      res.json({ success: true, message: "Solver executed successfully." });
    } else {
      console.error("Solver process failed.");
      res
        .status(500)
        .json({ success: false, error: "Solver execution failed." });
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Prisma Client disconnected");
  process.exit(0);
});
