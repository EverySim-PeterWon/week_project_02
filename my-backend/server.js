const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // PostgreSQL인 경우

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// PostgreSQL 연결 설정
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "8090",
  database: "mydb",
});

// 간단 테스트 라우트, 나중에 어떤  것을 불러와서 실행할지를 여기에서 설정함
app.get("/", (req, res) => {
  res.send("Hello from Express Backend");
});

// 예시: 유저 생성 (INSERT)
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
      [name, email]
    );
    res.json({ success: true, insertId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

// 예시: 유저 목록 조회 (SELECT)
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
