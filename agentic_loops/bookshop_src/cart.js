const carts = new Map();

function addToCart(userId, book, quantity) {
  const cart = carts.get(userId) || [];
  cart.push({ bookId: book.id, priceCents: book.priceCents, quantity });
  carts.set(userId, cart);
  return cart;
}

function removeFromCart(userId, bookId) {
  const cart = carts.get(userId) || [];
  const updated = cart.filter((item) => item.bookId !== bookId);
  carts.set(userId, updated);
  return updated;
}

function updateQuantity(userId, bookId, quantity) {
  const cart = carts.get(userId) || [];
  const item = cart.find((i) => i.bookId === bookId);
  item.quantity = quantity;
  return cart;
}

function getCart(userId) {
  return carts.get(userId) || [];
}

function clearCart(userId) {
  carts.delete(userId);
}

function cartItemCount(userId) {
  return getCart(userId).reduce((sum, item) => sum + item.quantity);
}

module.exports = {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  clearCart,
  cartItemCount,
};
