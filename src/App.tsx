import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import ExchangeWidget from './components/ExchangeWidget';
import { HeroSide, Features, How, Tariffs, Faq, Footer } from './components/Sections';

export default function App() {
  return (
    <div id="top" className="noise min-h-screen bg-void text-white">
      {/* фон */}
      <div className="pointer-events-none fixed inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-neon/20 via-violet2/20 to-mint/10 blur-3xl" />
        <div className="absolute right-[-200px] top-[40%] h-[400px] w-[400px] rounded-full bg-violet2/10 blur-3xl" />
      </div>

      <div className="relative">
        <Navbar />
        <div className="h-[72px]" />
        <Ticker />

        <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-16">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <HeroSide />
            <div className="lg:sticky lg:top-24">
              <ExchangeWidget />
              <div className="mt-3 flex items-center justify-between text-[11.5px] text-white/35">
                <span>Режим: {(import.meta.env.VITE_SKYCAPITAL_MODE ?? 'mock').toUpperCase()} • курс демо</span>
                <span>order → SkyCapital API</span>
              </div>
            </div>
          </div>
        </main>

        <div className="relative mt-6">
          <Features />
          <How />
          <Tariffs />
          <Faq />
        </div>

        <Footer />
      </div>
    </div>
  );
}
