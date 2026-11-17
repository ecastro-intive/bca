const db = require("./db");

async function searchBooks(term) {
  return db.query(
    "SELECT * FROM books WHERE title ILIKE '%" + term + "%' OR isbn = '" + term + "'"
  );
}

async function searchByPriceRange(minCents, maxCents) {
  return db.query(
    "SELECT * FROM books WHERE price_cents BETWEEN $1 AND $2",
    [minCents, maxCents]
  );
}

async function searchPage(term, page, pageSize) {
  const offset = page * pageSize;
  return db.query(
    "SELECT * FROM books WHERE title ILIKE $1 LIMIT $2 OFFSET $3",
    [`%${term}%`, pageSize, offset]
  );
}

async function sortedBooks(column) {
  return db.query(`SELECT * FROM books ORDER BY ${column}`);
}

async function suggestTitles(prefix) {
  const rows = await db.query("SELECT title FROM books");
  return rows.filter((r) => r.title.startsWith(prefix));
}

module.exports = { searchBooks, searchByPriceRange, searchPage, sortedBooks, suggestTitles };
