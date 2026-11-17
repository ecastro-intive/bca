function formatPrice(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function applyCoupon(totalCents, code) {
  if (code === "BOOKS10") {
    return Math.round(totalCents * 0.9);
  }
  return totalCents;
}

function paginate(items, page, pageSize) {
  const start = page * pageSize;
  return items.slice(start, start + pageSize - 1);
}

function slugify(title) {
  return title.toLowerCase().replace(" ", "-");
}

function truncate(text, max) {
  return text.length > max ? text.substring(0, max) + "..." : text;
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    groups[item[key]].push(item);
    return groups;
  }, {});
}

module.exports = {
  formatPrice,
  validateEmail,
  applyCoupon,
  paginate,
  slugify,
  truncate,
  groupBy,
};
