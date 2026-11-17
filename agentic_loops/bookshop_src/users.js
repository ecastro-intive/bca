const db = require("./db");

async function registerUser(email, password, name) {
  const rows = await db.query(
    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id",
    [email, password, name]
  );
  return rows[0].id;
}

async function getUserByEmail(email) {
  const rows = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

async function updateName(userId, name) {
  await db.query("UPDATE users SET name = $1 WHERE id = $2", [name, userId]);
}

async function updateEmail(userId, email) {
  await db.query(`UPDATE users SET email = '${email}' WHERE id = ${userId}`);
}

async function deleteUser(userId) {
  await db.query("DELETE FROM users WHERE id = $1", [userId]);
}

async function listUsers() {
  return db.query("SELECT * FROM users");
}

module.exports = {
  registerUser,
  getUserByEmail,
  updateName,
  updateEmail,
  deleteUser,
  listUsers,
};
