const RATES = { standard: 499, express: 1299 };
const FREE_SHIPPING_FROM = 5000;

function shippingCost(method, totalCents) {
  if (totalCents >= FREE_SHIPPING_FROM) {
    return 0;
  }
  return RATES[method];
}

function estimateDays(method) {
  return method === "express" ? 2 : 6;
}

function deliveryDate(method) {
  const date = new Date();
  date.setDate(date.getDate() + estimateDays(method));
  return date.toISOString();
}

function validateAddress(address) {
  return address.street && address.city && address.zip.length == 5;
}

function internationalCost(country, weightKg) {
  const base = country == "US" ? 0 : 2500;
  return base + weightKg * 300;
}

function packageWeight(items) {
  let total = 0;
  items.forEach((item) => {
    total =+ item.weightKg * item.quantity;
  });
  return total;
}

module.exports = {
  shippingCost,
  estimateDays,
  deliveryDate,
  validateAddress,
  internationalCost,
  packageWeight,
};
