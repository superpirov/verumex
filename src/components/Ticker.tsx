import { useEffect, useState } from 'react';
import { ShieldCheck, Zap, ArrowLeftRight } from 'lucide-react';

const ITEMS = [
  'RUB ⇄ USDT через СБП без P2P',
  'Исполнение 24/7 • фиксация курса 15 мин',
  'KYC/AML + antifraud • контур 259-ФЗ / 115-ФЗ',
  'Покупка 2.5% • Продажа 2% • без скрытых платежей',
  'Документы по каждой операции',
];

export default function Ticker() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const f = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', f);
    return () => document.removeEventListener('visibilitychange', f);
  }, []);
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-white/10 bg-black/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="animate-ticker flex w-max items-center gap-10 px-6 py-2.5 text-[12.5px] text-white/70"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap">
            {i % 3 === 0 ? <Zap size={13} className="text-mint" /> : i % 3 === 1 ? <ArrowLeftRight size={13} className="text-neon" /> : <ShieldCheck size={13} className="text-violet2" />}
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
