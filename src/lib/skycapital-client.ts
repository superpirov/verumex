import type { CurrencyId } from './currencies';
import type { Order, OrderInput, RateQuote } from './api';

/**
 * LIVE-клиент SkyCapital.
 * TODO: заполнить, когда пришлют спеки (см. docs/SKYCAPITAL-API-TODO.md).
 *
 * Ожидаемая схема:
 *  GET  {BASE}/rates?from=RUB&to=USDT_TRC20  (header: X-Api-Key)
 *  POST {BASE}/orders { direction, amountFrom, payout, bank }
 *  GET  {BASE}/orders/:id
 *  POST /webhooks/skycapital (проверка X-Signature)
 *
 * ВАЖНО: ключ нельзя светить во фронте — live-запросы должны идти
 * через твой бэкенд-прокси (Vite proxy / Cloudflare Worker / свой API).
 */

const BASE = import.meta.env.VITE_SKYCAPITAL_API_URL as string | undefined;
const KEY = import.meta.env.VITE_SKYCAPITAL_API_KEY as string | undefined;

function assertLive() {
  if (!BASE || !KEY) throw new Error('SkyCapital live: нет VITE_SKYCAPITAL_API_URL / KEY');
}

export async function liveGetRate(from: CurrencyId, to: CurrencyId): Promise<RateQuote> {
  assertLive();
  const res = await fetch(`${BASE}/rates?from=${from}&to=${to}`, {
    headers: { 'X-Api-Key': KEY! },
  });
  if (!res.ok) throw new Error('SkyCapital rate error: ' + res.status);
  return (await res.json()) as RateQuote;
}

export async function liveCreateOrder(input: OrderInput): Promise<Order> {
  assertLive();
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Api-Key': KEY! },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error('SkyCapital order error: ' + res.status);
  return (await res.json()) as Order;
}

export async function liveGetStatus(id: string): Promise<Order['status']> {
  assertLive();
  const res = await fetch(`${BASE}/orders/${id}`, {
    headers: { 'X-Api-Key': KEY! },
  });
  if (!res.ok) throw new Error('SkyCapital status error: ' + res.status);
  const data = (await res.json()) as Order;
  return data.status;
}
