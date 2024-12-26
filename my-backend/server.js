import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// 정적 파일 서빙 설정 추가
app.use("/png", express.static(path.join(__dirname, "png")));

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
app.get("/solvers", (req, res) => {
  const projectId = Number(req.query.projectId);

  if (isNaN(projectId)) {
    return res.status(400).json({ error: "Valid Project ID is required!" });
  }

  console.log(__dirname);

  const solverPath = path.join(__dirname, "script/euler_equation.py");
  console.log("Solver path: ", solverPath);

  // 파일 존재 여부 확인
  if (!fs.existsSync(solverPath)) {
    return res.status(500).json({ error: "Solver script not found." });
  }

  // Python 실행
  const pythonProcess = spawn("python", [solverPath, projectId]);

  let filePath = "";
  let errorOccurred = false;
  let errorMessage = "";

  pythonProcess.stdout.on("data", (data) => {
    filePath = data.toString().trim();
    console.log(`Solver Output (File Path): ${filePath}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    errorOccurred = true;
    errorMessage = data.toString();
    console.error(`Error: ${errorMessage}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0 && !errorOccurred) {
      res.json({ success: true, url: filePath });
    } else {
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error:
            errorMessage || `Solver execution failed with exit code ${code}`,
        });
      }
    }
  });
});

// 서버 시작 (라우트 외부)
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// 서버 종료 시 Prisma 클라이언트 연결 해제
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Prisma Client disconnected");
  process.exit(0);
});
