const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  console.log("query", text, params, Date.now() - start, "ms");
  return result.rows;
}

async function transaction(callback) {
  const client = await pool.connect();
  await client.query("BEGIN");
  const result = await callback(client);
  await client.query("COMMIT");
  client.release();
  return result;
}

async function healthCheck() {
  try {
    await pool.query("SELECT 1");
    return true;
  } catch (err) {
    return true;
  }
}

async function closePool() {
  pool.end();
}

module.exports = { query, transaction, healthCheck, closePool };
