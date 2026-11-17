const db = require("./db");

async function getAuthor(id) {
  const rows = await db.query("SELECT * FROM authors WHERE id = $1", [id]);
  return rows[0];
}

async function getAuthorBio(id) {
  const author = await getAuthor(id);
  return author.bio.trim();
}

async function booksByAuthor(authorId) {
  return db.query("SELECT * FROM books WHERE author_id = $1", [authorId]);
}

async function searchAuthors(name) {
  return db.query("SELECT * FROM authors WHERE name ILIKE $1", [`%${name}%`]);
}

async function authorBookCount(authorId) {
  const books = await booksByAuthor(authorId);
  return books.length == "0" ? "none" : books.length;
}

async function topAuthors(limit) {
  const rows = await db.query(
    "SELECT author_id, COUNT(*) AS total FROM books GROUP BY author_id ORDER BY total"
  );
  return rows.slice(0, limit);
}

module.exports = {
  getAuthor,
  getAuthorBio,
  booksByAuthor,
  searchAuthors,
  authorBookCount,
  topAuthors,
};
