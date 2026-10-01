import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftRight, ShieldCheck, Timer, Wallet, Phone,
  CheckCircle2, Loader2, QrCode, FileCheck, ChevronDown,
} from 'lucide-react';
import { CURRENCIES, DIRECTIONS, getCurrency, type CurrencyId } from '../lib/currencies';
import { createOrder, getRate, type RateQuote } from '../lib/api';

type Step = 'form' | 'details' | 'payment' | 'done';

const BANKS = ['Тинькофф', 'Сбер', 'ВТБ', 'Альфа', 'Райффайзен', 'ОТП', 'Другой (СБП)'];

function fmt(n: number, dp = 2): string {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('ru-RU', { maximumFractionDigits: dp, minimumFractionDigits: 0 });
}

export default function ExchangeWidget() {
  const [from, setFrom] = useState<CurrencyId>('RUB_SBP');
  const [to, setTo] = useState<CurrencyId>('USDT_TRC20');
  const [amountFrom, setAmountFrom] = useState('15000');
  const [quote, setQuote] = useState<RateQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [payout, setPayout] = useState('');
  const [bank, setBank] = useState(BANKS[0]);
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [creating, setCreating] = useState(false);
  const [countdown, setCountdown] = useState('');

  const fromC = getCurrency(from);
  const toC = getCurrency(to);

  const amountNum = useMemo(() => parseFloat((amountFrom || '').replace(',', '.')) || 0, [amountFrom]);
  const amountTo = useMemo(() => (quote ? amountNum * quote.rate : 0), [quote, amountNum]);

  // подтягиваем курс при смене направления
  useEffect(() => {
    let alive = true;
    setLoading(true);
    getRate(from, to)
      .then((q) => alive && setQuote(q))
      .catch(() => alive && setQuote(null))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [from, to]);

  // таймер фиксации курса
  useEffect(() => {
    if (!quote) return;
    const t = setInterval(() => {
      const ms = quote.fixedUntil - Date.now();
      if (ms <= 0) {
        setCountdown('обновляется…');
        getRate(from, to).then(setQuote).catch(() => {});
        return;
      }
      const m = Math.floor(ms / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setCountdown(`${m}:${s.toString().padStart(2, '0')}`);
    }, 500);
    return () => clearInterval(t);
  }, [quote, from, to]);

  const dirFee = useMemo(
    () => DIRECTIONS.find((d) => d.from === from && d.to === to)?.fee ?? quote?.feePct ?? 0.025,
    [from, to, quote],
  );

  const validAmount = amountNum >= (from === 'RUB_SBP' ? 1000 : 5);
  const validPayout = payout.trim().length >= (from === 'RUB_SBP' ? 10 : 20);

  function swap() {
    setFrom(to);
    setTo(from);
    setStep('form');
  }

  function pickDirection(f: CurrencyId, t: CurrencyId) {
    setFrom(f);
    setTo(t);
    setStep('form');
  }

  async function submitOrder() {
    if (!quote) return;
    setCreating(true);
    try {
      const order = await createOrder({
        from, to,
        amountFrom: amountNum,
        amountTo,
        rate: quote.rate,
        payout: payout.trim(),
        bank: to === 'RUB_SBP' ? bank : undefined,
        email: email.trim() || undefined,
      });
      setOrderId(order.id);
      setStep(order.status === 'pending_payment' ? 'payment' : 'done');
      if (order.status !== 'pending_payment') setStep('done');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div id="exchange" className="glass relative overflow-hidden rounded-3xl p-5 shadow-card sm:p-7">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full bg-gradient-to-r from-neon/25 via-violet2/25 to-mint/20 blur-3xl" />

      <div className="relative mb-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[13px] text-white/60">
          <span className="flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1 text-mint">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> online • СБП C2B
          </span>
          <span className="hidden items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 sm:flex">
            <Timer size={13} /> курс фиксируется {countdown || '…'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-white/50">
          <ShieldCheck size={14} className="text-mint" /> KYC/AML • 259-ФЗ
        </div>
      </div>

      {/* быстрые направления */}
      <div className="relative mb-4 flex gap-2 overflow-x-auto pb-1">
        {DIRECTIONS.slice(0, 6).map((d) => {
          const active = d.from === from && d.to === to;
          return (
            <button
              key={d.from + d.to}
              onClick={() => pickDirection(d.from, d.to)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] transition ${
                active
                  ? 'bg-white text-black font-semibold'
                  : 'border border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white'
              }`}
            >
              {getCurrency(d.from).symbol} → {getCurrency(d.to).symbol} · {d.tag}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {step === 'form' && (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* отдаёте */}
            <label className="mb-1.5 block text-[12px] uppercase tracking-widest text-white/45">Отдаёте</label>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 focus-within:border-neon/60">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 text-xl font-bold">
                  {fromC.icon}
                </div>
                <input
                  value={amountFrom}
                  onChange={(e) => setAmountFrom(e.target.value.replace(/[^0-9.,]/g, ''))}
                  inputMode="decimal"
                  placeholder="0.00"
                  className="w-full bg-transparent font-display text-2xl font-bold outline-none placeholder:text-white/20"
                />
                <CurrencySelect value={from} onChange={(v) => { setFrom(v); }} exclude={to} />
              </div>
              <div className="mt-2 flex justify-between text-[12px] text-white/40">
                <span>{fromC.name}{fromC.network ? ` • ${fromC.network}` : ''}</span>
                <span>min {fmt(from === 'RUB_SBP' ? 1000 : 5)} • max {fmt(from === 'RUB_SBP' ? 600000 : 2000, 0)}</span>
              </div>
            </div>

            <div className="my-1 flex justify-center">
              <button
                onClick={swap}
                className="group -my-1 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#0B1120] shadow-glow transition hover:rotate-180 hover:border-neon"
                aria-label="Поменять направление"
              >
                <ArrowLeftRight size={17} className="text-neon" />
              </button>
            </div>

            {/* получаете */}
            <label className="mb-1.5 block text-[12px] uppercase tracking-widest text-white/45">Получаете</label>
            <div className="rounded-2xl border border-mint/20 bg-gradient-to-b from-mint/10 to-transparent p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-mint/30 to-neon/20 text-xl font-bold">
                  {toC.icon}
                </div>
                <div className="w-full font-display text-2xl font-bold text-mint">
                  {loading ? <span className="animate-pulse text-white/40">···</span> : fmt(amountTo, to === 'RUB_SBP' ? 2 : 4)}
                </div>
                <CurrencySelect value={to} onChange={(v) => setTo(v)} exclude={from} />
              </div>
              <div className="mt-2 flex justify-between text-[12px] text-white/40">
                <span>{toC.name}{toC.network ? ` • ${toC.network}` : ''}</span>
                <span>
                  1 {fromC.symbol} ≈ {quote ? fmt(quote.rate, to === 'RUB_SBP' ? 4 : 6) : '—'} {toC.symbol}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 rounded-xl bg-white/[.03] px-3.5 py-2.5 text-[12.5px] text-white/55">
              <span>Комиссия SkyCapital {(dirFee * 100).toFixed(1)}% уже в курсе</span>
              <span className="text-white/25">•</span>
              <span>Сеть + СБП — 0 ₽ скрытых</span>
              <span className="text-white/25">•</span>
              <span className="text-mint">~1–5 мин</span>
            </div>

            {!validAmount && amountFrom && (
              <div className="mt-2 text-[12.5px] text-amber-300">Минимальная сумма — {from === 'RUB_SBP' ? '1 000 ₽' : 'эквивалент ~5 USDT'}.</div>
            )}

            <button
              disabled={!validAmount || loading}
              onClick={() => setStep('details')}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-neon via-[#4d7fff] to-violet2 py-4 font-display text-[15px] font-bold text-white shadow-glow transition hover:brightness-110 disabled:opacity-40"
            >
              {loading ? 'Считаем лучший курс…' : `Обменять ${fmt(amountNum)} ${fromC.symbol} → ${fmt(amountTo)} ${toC.symbol}`}
            </button>
            <p className="mt-2.5 text-center text-[11.5px] text-white/35">
              Нажимая «Обменять», вы соглашаетесь с офертой и обработкой данных для KYC/AML
            </p>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div key="details" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <button onClick={() => setStep('form')} className="mb-3 text-[13px] text-white/50 hover:text-white">← назад к сумме</button>
            <h3 className="font-display text-lg font-bold">Куда отправить {toC.symbol}?</h3>
            <p className="mb-4 mt-1 text-[13px] text-white/55">
              {fmt(amountNum)} {fromC.symbol} → <span className="text-mint font-semibold">{fmt(amountTo)} {toC.symbol}</span> по фиксированному курсу
            </p>

            {to === 'RUB_SBP' ? (
              <div className="grid gap-3">
                <label className="grid gap-1.5 text-[13px] text-white/60">
                  <span className="flex items-center gap-1.5"><Phone size={14} /> Телефон для СБП-выплаты</span>
                  <input
                    value={payout} onChange={(e) => setPayout(e.target.value)}
                    placeholder="+7 ___ ___-__-__"
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon"
                  />
                </label>
                <label className="grid gap-1.5 text-[13px] text-white/60">
                  <span>Банк получателя</span>
                  <div className="relative">
                    <select value={bank} onChange={(e) => setBank(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon">
                      {BANKS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
                  </div>
                </label>
              </div>
            ) : (
              <div className="grid gap-3">
                <label className="grid gap-1.5 text-[13px] text-white/60">
                  <span className="flex items-center gap-1.5"><Wallet size={14} /> Ваш кошелёк {toC.symbol}{toC.network ? ` (${toC.network})` : ''}</span>
                  <input
                    value={payout} onChange={(e) => setPayout(e.target.value)}
                    placeholder={to.startsWith('USDT') ? 'T... (TRC20) / 0x... / ...' : 'Адрес кошелька'}
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13.5px] text-white outline-none focus:border-neon"
                  />
                </label>
                <div className="flex gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 px-3.5 py-3 text-[12.5px] text-amber-200/90">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                  Проверьте сеть: {toC.network ?? '—'}. Ошибка в сети = потеря средств. AML-скрининг кошелька — автоматически.
                </div>
              </div>
            )}

            <label className="mt-3 grid gap-1.5 text-[13px] text-white/60">
              <span>Email для чека и документов (необязательно)</span>
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@mail.ru"
                className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon"
              />
            </label>

            <button
              disabled={!validPayout || creating}
              onClick={submitOrder}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-display text-[15px] font-bold text-black transition hover:bg-neon disabled:opacity-40"
            >
              {creating ? <><Loader2 className="animate-spin" size={18} /> Создаём заявку…</> : 'Подтвердить и перейти к оплате'}
            </button>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-mint/10 text-mint"><QrCode size={30} /></div>
            <h3 className="mt-3 font-display text-lg font-bold">Заявка {orderId} создана</h3>
            <p className="mx-auto mt-1 max-w-sm text-[13.5px] text-white/60">
              {from === 'RUB_SBP'
                ? <>Оплатите <b className="text-white">{fmt(amountNum)} ₽</b> по СБП на счёт SkyCapital (C2B, юрлицо — без P2P-переводов). После оплаты USDT уйдут на ваш кошелёк автоматически.</>
                : <>Отправьте <b className="text-white">{fmt(amountNum)} {fromC.symbol}</b> на адрес из live-режима, затем нажмите «Я оплатил». Выплата {fmt(amountTo)} ₽ придёт через СБП на {payout}.</>}
            </p>
            <div className="mx-auto mt-4 grid max-w-sm gap-2 rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-[13px]">
              <div className="flex justify-between"><span className="text-white/50">Отдаёте</span><b>{fmt(amountNum)} {fromC.symbol}</b></div>
              <div className="flex justify-between"><span className="text-white/50">Получаете</span><b className="text-mint">{fmt(amountTo)} {toC.symbol}</b></div>
              <div className="flex justify-between"><span className="text-white/50">Реквизиты</span><span className="text-right text-white/80">СБП → SkyCapital • C2B</span></div>
            </div>
            <div className="mx-auto mt-4 flex max-w-sm gap-2">
              <button onClick={() => setStep('done')} className="flex-1 rounded-xl bg-gradient-to-r from-neon to-violet2 py-3.5 font-semibold text-white shadow-glow">
                Я оплатил
              </button>
              <button onClick={() => setStep('form')} className="rounded-xl border border-white/15 px-5 py-3.5 text-white/70 hover:text-white">
                Отмена
              </button>
            </div>
            <p className="mt-3 text-[11.5px] text-white/35">Mock-режим: QR СБП и вебхук статуса появятся после подключения live API</p>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint/15 text-mint"><CheckCircle2 size={32} /></div>
            <h3 className="mt-3 font-display text-lg font-bold">Принято в исполнение!</h3>
            <p className="mx-auto mt-1 max-w-sm text-[13.5px] text-white/60">
              Заявка <b className="text-white">{orderId}</b> исполняется на стороне SkyCapital: расчёты, KYC/AML и antifraud. Среднее время — 1–5 минут.
            </p>
            <div className="mx-auto mt-4 flex max-w-sm items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-left text-[12.5px] text-white/60">
              <FileCheck size={16} className="shrink-0 text-mint" />
              Документы по операции (оферта, чек, AML-отчёт) появятся в личном кабинете и придут на email.
            </div>
            <button onClick={() => { setStep('form'); setPayout(''); }} className="mx-auto mt-4 block w-full max-w-sm rounded-xl bg-white py-3.5 font-semibold text-black hover:bg-neon">
              Создать новый обмен
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CurrencySelect({ value, onChange, exclude }: { value: CurrencyId; onChange: (v: CurrencyId) => void; exclude: CurrencyId }) {
  const [open, setOpen] = useState(false);
  const cur = getCurrency(value);
  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13.5px] font-semibold hover:border-white/30"
      >
        {cur.symbol} <ChevronDown size={14} className="text-white/50" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120] p-1.5 shadow-card">
            {CURRENCIES.filter((c) => c.id !== exclude).map((c) => (
              <button
                key={c.id}
                onClick={() => { onChange(c.id); setOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5 ${c.id === value ? 'bg-white/5' : ''}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-lg">{c.icon}</span>
                <span>
                  <span className="block text-[13.5px] font-semibold">{c.symbol} <span className="font-normal text-white/40">{c.network ?? ''}</span></span>
                  <span className="block text-[11.5px] text-white/45">{c.name}</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
