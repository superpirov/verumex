export type CurrencyId =
  | 'RUB_SBP'
  | 'USDT_TRC20'
  | 'USDT_ERC20'
  | 'USDT_SPL'
  | 'BTC'
  | 'ETH'
  | 'TRX'
  | 'USDC_SPL';

export interface Currency {
  id: CurrencyId;
  symbol: string;
  name: string;
  network?: string;
  icon: string;
  kind: 'fiat' | 'crypto';
  min: number;
  max: number;
}

export const CURRENCIES: Currency[] = [
  { id: 'RUB_SBP', symbol: '₽', name: 'Рубли через СБП', icon: '₽', kind: 'fiat', min: 1000, max: 600000 },
  { id: 'USDT_TRC20', symbol: 'USDT', name: 'Tether TRC-20', network: 'TRON', icon: '₮', kind: 'crypto', min: 10, max: 2000 },
  { id: 'USDT_ERC20', symbol: 'USDT', name: 'Tether ERC-20', network: 'Ethereum', icon: '₮', kind: 'crypto', min: 10, max: 2000 },
  { id: 'USDT_SPL', symbol: 'USDT', name: 'Tether SPL', network: 'Solana', icon: '₮', kind: 'crypto', min: 10, max: 2000 },
  { id: 'BTC', symbol: 'BTC', name: 'Bitcoin', icon: '₿', kind: 'crypto', min: 0.0005, max: 1 },
  { id: 'ETH', symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', kind: 'crypto', min: 0.005, max: 20 },
  { id: 'TRX', symbol: 'TRX', name: 'Tron', icon: 'T', kind: 'crypto', min: 50, max: 100000 },
  { id: 'USDC_SPL', symbol: 'USDC', name: 'USD Coin SPL', network: 'Solana', icon: '$', kind: 'crypto', min: 10, max: 2000 },
];

export const DIRECTIONS = [
  { from: 'RUB_SBP' as CurrencyId, to: 'USDT_TRC20' as CurrencyId, tag: 'ХИТ', fee: 0.025 },
  { from: 'USDT_TRC20' as CurrencyId, to: 'RUB_SBP' as CurrencyId, tag: 'СБП 1 мин', fee: 0.02 },
  { from: 'RUB_SBP' as CurrencyId, to: 'BTC' as CurrencyId, tag: '24/7', fee: 0.025 },
  { from: 'RUB_SBP' as CurrencyId, to: 'ETH' as CurrencyId, tag: '24/7', fee: 0.025 },
  { from: 'RUB_SBP' as CurrencyId, to: 'TRX' as CurrencyId, tag: 'LOW FEE', fee: 0.025 },
  { from: 'RUB_SBP' as CurrencyId, to: 'USDT_ERC20' as CurrencyId, tag: 'ERC20', fee: 0.025 },
  { from: 'RUB_SBP' as CurrencyId, to: 'USDT_SPL' as CurrencyId, tag: 'SPL', fee: 0.025 },
];

export function getCurrency(id: CurrencyId): Currency {
  return CURRENCIES.find((c) => c.id === id)!;
}
