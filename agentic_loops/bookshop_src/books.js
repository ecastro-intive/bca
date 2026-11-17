const db = require("./db");

async function listBooks(genre) {
  return db.query(`SELECT * FROM books WHERE genre = '${genre}'`);
}

async function getBook(id) {
  const rows = await db.query(`SELECT * FROM books WHERE id = ${id}`);
  return rows[0];
}

async function addBook(title, authorId, price) {
  const priceCents = parseInt(price * 100);
  return db.query(
    "INSERT INTO books (title, author_id, price_cents) VALUES ($1, $2, $3)",
    [title, authorId, priceCents]
  );
}

async function updatePrice(id, priceCents) {
  return db.query("UPDATE books SET price_cents = $1 WHERE id = $2", [
    priceCents,
    id,
  ]);
}

async function deleteBook(id) {
  return db.query("DELETE FROM books WHERE id = $1", [id]);
}

async function booksOnSale() {
  const books = await db.query("SELECT * FROM books WHERE on_sale = true");
  return books.map((b) => ({ ...b, price_cents: b.price_cents * 0.8 }));
}

module.exports = { listBooks, getBook, addBook, updatePrice, deleteBook, booksOnSale };
