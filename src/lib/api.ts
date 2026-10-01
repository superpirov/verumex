import type { CurrencyId } from './currencies';

/**
 * Единый контракт под SkyCapital API.
 * Сейчас работает MOCK. Когда дадут спеки — реализуй live-ветку
 * в skycapital-client.ts, не трогая виджет.
 */

export interface RateQuote {
  from: CurrencyId;
  to: CurrencyId;
  rate: number; // сколько единиц `to` за 1 единицу `from`
  inverse: number;
  feePct: number;
  fixedUntil: number; // timestamp фиксации курса
  min: number;
  max: number;
}

export interface OrderInput {
  from: CurrencyId;
  to: CurrencyId;
  amountFrom: number;
  amountTo: number;
  rate: number;
  payout: string; // кошелёк или телефон СБП
  bank?: string;
  email?: string;
}

export interface Order {
  id: string;
  status: 'pending_payment' | 'paid' | 'executing' | 'done' | 'aml_hold' | 'expired';
  sbpQr?: string;
  payUntil: number;
  requisites?: string;
}

const MODE = import.meta.env.VITE_SKYCAPITAL_MODE ?? 'mock';

// Базовые курсы mock (RUB за единицу крипты)
const BASE_RUB: Record<string, number> = {
  USDT_TRC20: 84.6,
  USDT_ERC20: 84.8,
  USDT_SPL: 84.5,
  BTC: 5820000,
  ETH: 214000,
  TRX: 18.4,
  USDC_SPL: 84.4,
};

function jitter(base: number): number {
  const drift = 1 + (Math.random() - 0.5) * 0.004;
  return base * drift;
}

function feeFor(from: CurrencyId, to: CurrencyId): number {
  const isBuy = from === 'RUB_SBP';
  return isBuy ? 0.025 : 0.02;
}

export async function getRate(from: CurrencyId, to: CurrencyId): Promise<RateQuote> {
  if (MODE === 'live') {
    const { liveGetRate } = await import('./skycapital-client');
    return liveGetRate(from, to);
  }
  await new Promise((r) => setTimeout(r, 350));
  const feePct = feeFor(from, to);

  let rate: number;
  if (from === 'RUB_SBP') {
    rate = (1 / jitter(BASE_RUB[to] ?? 84.6)) * (1 - feePct);
  } else if (to === 'RUB_SBP') {
    rate = jitter(BASE_RUB[from] ?? 84.6) * (1 - feePct);
  } else {
    rate = jitter(1);
  }

  const now = Date.now();
  return {
    from,
    to,
    rate,
    inverse: 1 / rate,
    feePct,
    fixedUntil: now + 15 * 60 * 1000,
    min: 1000,
    max: 600000,
  };
}

export async function createOrder(input: OrderInput): Promise<Order> {
  if (MODE === 'live') {
    const { liveCreateOrder } = await import('./skycapital-client');
    return liveCreateOrder(input);
  }
  await new Promise((r) => setTimeout(r, 700));
  const id = 'VX-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  return {
    id,
    status: 'pending_payment',
    payUntil: Date.now() + 20 * 60 * 1000,
    requisites: input.from === 'RUB_SBP' ? 'СБП → SkyCapital • ООО «СКАЙКАПИТАЛ» (C2B, без P2P)' : undefined,
  };
}

export async function getOrderStatus(id: string): Promise<Order['status']> {
  if (MODE === 'live') {
    const { liveGetStatus } = await import('./skycapital-client');
    return liveGetStatus(id);
  }
  void id;
  await new Promise((r) => setTimeout(r, 500));
  // mock: всегда в исполнении — демо-статус
  return 'executing';
}
