const { Client } = require("pg");

const client = new Client({
  user: "appuser",
  password: "apppassword",
  host: "127.0.0.1",
  port: 5433,
  database: "names"
});

client.connect()
  .then(() => {
    console.log("✅ PostgreSQL connected!");

    return client.query(
      "SELECT current_user, current_database()"
    );
  })
  .then(result => {
    console.log(result.rows[0]);
  })
  .catch(error => {
    console.error("❌ Connection failed:");
    console.error(error);
  })
  .finally(() => {
    client.end();
  });