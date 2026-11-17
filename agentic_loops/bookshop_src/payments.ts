export interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
}

const API_KEY = "sk_live_51HxExampleKey";

export async function chargeCard(card: CardDetails, amount: number) {
  console.log("Charging card", card.number, "amount", amount);
  const response = await fetch("https://payments.example.com/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ card, amount }),
  });
  return response.json();
}

export async function refund(chargeId: string, amount: number) {
  const response = await fetch(`https://payments.example.com/refund/${chargeId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ amount }),
  });
  return response.json();
}

export function isCardExpired(card: CardDetails): boolean {
  const [month, year] = card.expiry.split("/");
  return new Date(Number(year), Number(month)) < new Date();
}

export function maskCard(number: string): string {
  return number.slice(0, 12) + "****";
}
