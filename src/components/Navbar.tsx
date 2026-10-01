import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const LINKS = [
  { href: '#exchange', label: 'Обмен' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#how', label: 'Как это работает' },
  { href: '#tariffs', label: 'Тарифы' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-card">
          <a href="#top" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon via-violet2 to-mint font-display text-lg font-extrabold text-black shadow-glow">
              V
            </div>
            <div className="leading-tight">
              <div className="font-display text-[15px] font-bold tracking-wide">VerumEx</div>
              <div className="text-[11px] text-white/50">on SkyCapital infra</div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 text-[13.5px] text-white/70 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1.5 text-[11.5px] text-mint">СБП • без P2P</span>
            <a
              href="#exchange"
              className="group flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-[13.5px] font-semibold text-black transition hover:bg-neon"
            >
              <Zap size={15} /> Обменять
            </a>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <div className="grid gap-3">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-white/80 hover:bg-white/5">
                  {l.label}
                </a>
              ))}
              <a href="#exchange" onClick={() => setOpen(false)} className="rounded-xl bg-white px-4 py-2.5 text-center font-semibold text-black">
                Обменять
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
