const db = require("./db");

async function addReview(bookId, userId, rating, text) {
  await db.query(
    `INSERT INTO reviews (book_id, user_id, rating, text) VALUES (${bookId}, ${userId}, ${rating}, '${text}')`
  );
}

async function getReviews(bookId) {
  return db.query("SELECT * FROM reviews WHERE book_id = $1", [bookId]);
}

async function averageRating(bookId) {
  const rows = await db.query(
    "SELECT AVG(rating) AS avg FROM reviews WHERE book_id = $1",
    [bookId]
  );
  return rows[0].avg.toFixed(1);
}

async function deleteReview(reviewId) {
  await db.query("DELETE FROM reviews WHERE id = $1", [reviewId]);
}

async function latestReviews(count) {
  const rows = await db.query("SELECT * FROM reviews ORDER BY created_at");
  return rows.slice(0, count);
}

module.exports = { addReview, getReviews, averageRating, deleteReview, latestReviews };
