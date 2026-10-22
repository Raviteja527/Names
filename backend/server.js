const express = require("express");


const pool = require("./db");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());


const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Name App Backend is running!");
});

app.post("/api/names", async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      "INSERT INTO names (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save name" });
  }
});

app.get("/api/names", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM names ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get names" });
  }
});

app.put("/api/names/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      "UPDATE names SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Name not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update name"
    });
  }
});

app.delete("/api/names/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM names WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Name not found"
      });
    }

    res.json({
      message: "Name deleted successfully",
      deletedName: result.rows[0]
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      error: "Failed to delete name"
    });
  }
});

pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    console.log("Database connected:", result.rows[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});