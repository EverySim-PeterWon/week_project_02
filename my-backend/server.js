import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    // frontend domain
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// GET: 모든 프로젝트 목록 가져오기
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

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Prisma Client disconnected");
  process.exit(0);
});
