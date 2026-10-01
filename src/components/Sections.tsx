import { motion } from 'framer-motion';
import {
  ShieldCheck, Zap, Building2, FileCheck, ScanLine,
  ArrowRight, BadgeCheck, Lock, Landmark, Timer,
} from 'lucide-react';

export function HeroSide() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12.5px] text-white/70"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
        WhiteLabel на инфраструктуре SkyCapital • запуск 7–14 дней
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-5 font-display text-[34px] font-extrabold leading-[1.05] sm:text-[54px]"
      >
        Обменник нового поколения <br />
        <span className="text-gradient">RUB ⇄ крипта через СБП</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/60"
      >
        VerumEx исполняет сделки на rails SkyCapital: <b className="text-white">СБП-эквайринг C2B от юрлица</b> — без P2P-цепочек
        и серых схем. Мгновенный обмен до 2 000 USDT, выплаты от 1 000 ₽, KYC/AML и документы по каждой операции.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="mt-7 grid max-w-xl grid-cols-3 gap-3"
      >
        {[
          { v: '1–5 мин', l: 'средний обмен', i: <Timer size={15} /> },
          { v: 'C2B СБП', l: 'без P2P-рисков', i: <Building2 size={15} /> },
          { v: '24/7', l: 'авто-исполнение', i: <Zap size={15} /> },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl px-4 py-3.5">
            <div className="flex items-center gap-1.5 font-display text-[16px] font-bold text-white">{s.i}{s.v}</div>
            <div className="mt-1 text-[12px] text-white/50">{s.l}</div>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32 }}
        className="mt-6 flex flex-wrap items-center gap-2 text-[12px] text-white/45"
      >
        <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-mint" /> 259-ФЗ • 115-ФЗ</span>
        <span>•</span><span className="flex items-center gap-1.5"><Lock size={14} className="text-neon" /> Antifraud + AML-скрининг</span>
        <span>•</span><span className="flex items-center gap-1.5"><FileCheck size={14} className="text-violet2" /> Закрывающие документы</span>
      </motion.div>
    </div>
  );
}

const FEATS = [
  { icon: <Building2 />, t: 'СБП-эквайринг C2B', d: 'Рубли идут на счёт платформы-юрлица, а не физикам. Один платёж, без «треугольников» и блокировок по 115-ФЗ.', c: 'from-neon/25 to-transparent' },
  { icon: <Zap />, t: 'Мгновенный обмен', d: 'RUB → USDT за ~минуту: курс фиксируется на 15 минут, сделка — по рыночному курсу 24/7.', c: 'from-mint/25 to-transparent' },
  { icon: <ScanLine />, t: 'KYC / AML из коробки', d: 'Верификация, скрининг кошельков и транзакций, комплаенс-досье. Грязные средства не попадают в контур.', c: 'from-violet2/25 to-transparent' },
  { icon: <ShieldCheck />, t: 'Antifraud-мониторинг', d: 'Скоринг операций в реальном времени: холд подозрительных заявок, защита от chargeback и фрода.', c: 'from-amber-300/20 to-transparent' },
  { icon: <FileCheck />, t: 'Документы по сделке', d: 'Оферта, чек и отчёт по каждой операции — для бухгалтерии, банка и налоговой.', c: 'from-sky-400/20 to-transparent' },
  { icon: <Landmark />, t: 'Белый контур 2026', d: 'Агентская схема по ГК РФ, СБП Банка России, отчётность. Работа без рисков по ФЗ и УК РФ.', c: 'from-emerald-400/20 to-transparent' },
];

export function Features() {
  return (
    <section id="advantages" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[12px] uppercase tracking-[.25em] text-neon">Почему VerumEx</div>
          <h2 className="mt-2 font-display text-[26px] font-extrabold sm:text-[38px]">Инфраструктура SkyCapital.<br />Твой бренд спереди.</h2>
        </div>
        <p className="max-w-md text-[14px] text-white/55">Ты развиваешь клиентский сервис. Исполнение, расчёты, безопасность и бумаги — на стороне SkyCapital через API.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATS.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.06 }}
            className={`glass group rounded-3xl bg-gradient-to-b p-6 ${f.c}`}
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-neon transition group-hover:scale-110 group-hover:text-mint">{f.icon}</div>
            <h3 className="mt-4 font-display text-[16px] font-bold">{f.t}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', t: 'Выбери направление и сумму', d: 'RUB (СБП) → USDT / BTC / ETH / TRX / USDC. Курс с комиссией виден до подтверждения.' },
  { n: '02', t: 'Укажи реквизиты', d: 'Кошелёк для крипты или телефон + банк для выплаты через СБП. Email — для чеков.' },
  { n: '03', t: 'Оплати по СБП', d: 'Один платёж на счёт платформы (C2B). Никаких переводов незнакомцам, как в P2P.' },
  { n: '04', t: 'Получи и забери документы', d: 'Исполнение за 1–5 минут, закрывающие документы — в кабинете и на почте.' },
];

export function How() {
  return (
    <section id="how" className="border-y border-white/10 bg-white/[.02]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-[12px] uppercase tracking-[.25em] text-neon">Как это работает</div>
        <h2 className="mt-2 font-display text-[26px] font-extrabold sm:text-[34px]">4 шага — и крипта у тебя</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6">
              <div className="font-display text-[42px] font-extrabold text-white/10">{s.n}</div>
              <h3 className="mt-1 font-semibold">{s.t}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Tariffs() {
  return (
    <section id="tariffs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <div className="text-[12px] uppercase tracking-[.25em] text-neon">Прозрачные тарифы</div>
        <h2 className="mx-auto mt-2 max-w-2xl font-display text-[26px] font-extrabold sm:text-[38px]">Комиссия уже в курсе. Без скрытых платежей</h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
        <div className="glass relative overflow-hidden rounded-3xl p-7">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon/20 blur-3xl" />
          <div className="text-[13px] text-white/55">Покупка по СБП</div>
          <div className="mt-1 font-display text-[44px] font-extrabold">2.5%</div>
          <ul className="mt-4 grid gap-2 text-[13.5px] text-white/65">
            {['RUB → USDT / BTC / ETH / TRX', 'Один платёж C2B на юрлицо', 'Instant до 2 000 USDT • 24/7'].map((t) => <li key={t} className="flex gap-2"><ArrowRight size={15} className="mt-0.5 shrink-0 text-neon" />{t}</li>)}
          </ul>
        </div>
        <div className="glass relative overflow-hidden rounded-3xl border-mint/20 p-7">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint/20 blur-3xl" />
          <div className="text-[13px] text-white/55">Продажа с выплатой на СБП</div>
          <div className="mt-1 font-display text-[44px] font-extrabold text-mint">2%</div>
          <ul className="mt-4 grid gap-2 text-[13.5px] text-white/65">
            {['Крипта → ₽ на твой банк', 'Вывод от 1 000 ₽ • поиск по банкам', '2FA-подтверждение выплаты'].map((t) => <li key={t} className="flex gap-2"><ArrowRight size={15} className="mt-0.5 shrink-0 text-mint" />{t}</li>)}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-[12.5px] text-white/40">
        Маржа партнёра задаётся отдельно поверх тарифа SkyCapital. Точные лимиты (600 000 ₽/мес, instant-пороги) подтвердим после подключения live API.
      </p>
    </section>
  );
}

const FAQ = [
  { q: 'Это не P2P? Куда идут рубли?', a: 'Нет. Это СБП-эквайринг C2B: рубли идут на счёт платформы-юрлица, а не другому пользователю. Поэтому нет цепочки физиков, «треугольников» и типичных P2P-блокировок.' },
  { q: 'Нужна ли верификация (KYC)?', a: 'Да, базовая KYC/AML-проверка обязательна — это защита чистоты контура и твоих средств. Обычно занимает пару минут; при высоком риске заявка может уйти на ручной antifraud-чек.' },
  { q: 'Как быстро проходит обмен?', a: 'Мгновенный обмен RUB→USDT — около 1–5 минут после оплаты СБП. Курс фиксируется на 15 минут. Выплата на СБП — от 1 000 ₽.' },
  { q: 'Какие документы я получу?', a: 'Оферту/договор, чек операции и отчёт с суммой, направлением и датой. Документы доступны в кабинете и на email — удобно для банка и учёта.' },
  { q: 'Когда подключится настоящий API SkyCapital?', a: 'Фронт уже API-ready: все запросы идут через единый клиент. Как только получим ключи и спеки — переключим VITE_SKYCAPITAL_MODE=live без переделки виджета.' },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
      <h2 className="text-center font-display text-[24px] font-extrabold sm:text-[32px]">Частые вопросы</h2>
      <div className="mt-8 grid gap-3">
        {FAQ.map((f) => (
          <details key={f.q} className="glass group rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="cursor-pointer list-none font-semibold text-[14.5px]">{f.q}</summary>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-[16px] font-bold">VerumEx</div>
          <div className="mt-1 max-w-md text-[12.5px] text-white/45">
            Криптообменник на инфраструктуре SkyCapital. СБП-эквайринг C2B, KYC/AML, antifraud. Работа в контуре 259-ФЗ и 115-ФЗ. Не является публичной офертой.
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-[12.5px]">
          {['Оферта', 'Пользовательское соглашение', 'AML/KYC-политика', 'Контакты'].map((t) => (
            <span key={t} className="rounded-full border border-white/10 px-3.5 py-1.5 text-white/55">{t} — скоро</span>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-[11.5px] text-white/30">© 2026 VerumEx • Powered by SkyCapital infrastructure • mock-режим до подключения API</div>
    </footer>
  );
}
