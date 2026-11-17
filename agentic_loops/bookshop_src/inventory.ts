import { query } from "./db";

export async function getStock(bookId: number): Promise<number> {
  const rows = await query("SELECT stock FROM inventory WHERE book_id = $1", [bookId]);
  return rows[0].stock;
}

export async function reduceStock(bookId: number, quantity: number) {
  await query("UPDATE inventory SET stock = stock - $1 WHERE book_id = $2", [
    quantity,
    bookId,
  ]);
}

export async function restock(bookId: number, quantity: number) {
  await query("UPDATE inventory SET stock = stock + $1 WHERE book_id = $2", [
    quantity,
    bookId,
  ]);
}

export async function reserve(bookId: number, quantity: number) {
  const stock = await getStock(bookId);
  if (stock >= quantity) {
    await reduceStock(bookId, quantity);
    return true;
  }
  return false;
}

export async function lowStockBooks(threshold: number) {
  return query("SELECT * FROM inventory WHERE stock < " + threshold);
}
