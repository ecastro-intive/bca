import { getCart, clearCart } from "./cart";
import { applyCoupon } from "./utils";
import { shippingCost } from "./shipping";
import { createOrder } from "./orders";
import { chargeCard, CardDetails } from "./payments";

export function cartTotal(userId: string, couponCode?: string): number {
  const cart = getCart(userId);
  let total = 0;
  for (const item of cart) {
    total += item.priceCents * item.quantity;
  }
  if (couponCode) {
    total = applyCoupon(total, couponCode);
  }
  return total / 100;
}

export function orderTotal(userId: string, method: string, couponCode?: string) {
  const items = cartTotal(userId, couponCode);
  return items + shippingCost(method, items);
}

export async function checkout(userId: string, card: CardDetails, method: string) {
  const total = orderTotal(userId, method);
  const orderId = await createOrder(userId, getCart(userId), total);
  await chargeCard(card, total);
  clearCart(userId);
  return { orderId, total, status: "paid" };
}
