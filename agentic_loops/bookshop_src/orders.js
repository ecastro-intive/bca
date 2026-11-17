const db = require("./db");

async function createOrder(userId, items, total) {
  const rows = await db.query(
    "INSERT INTO orders (user_id, total, status) VALUES ($1, $2, 'paid') RETURNING id",
    [userId, total]
  );
  const orderId = rows[0].id;
  for (const item of items) {
    await db.query(
      "INSERT INTO order_items (order_id, book_id, quantity) VALUES ($1, $2, $3)",
      [orderId, item.bookId, item.quantity]
    );
  }
  return orderId;
}

async function getOrder(orderId) {
  const rows = await db.query("SELECT * FROM orders WHERE id = $1", [orderId]);
  return rows[0];
}

async function listOrders(userId, limit) {
  return db.query(
    "SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC LIMIT " + limit,
    [userId]
  );
}

async function cancelOrder(orderId) {
  await db.query("UPDATE orders SET status = 'cancelled' WHERE id = $1", [orderId]);
}

async function orderTotalsByStatus() {
  const rows = await db.query("SELECT status, SUM(total) AS sum FROM orders GROUP BY status");
  const result = {};
  rows.forEach((r) => (result[r.status] = r.sum));
  return result;
}

module.exports = { createOrder, getOrder, listOrders, cancelOrder, orderTotalsByStatus };
