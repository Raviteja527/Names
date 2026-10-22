const pool = require("./db");

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS names (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Names table created!");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  } finally {
    await pool.end();
  }
};

createTable();