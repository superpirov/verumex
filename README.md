# VerumEx — криптообменник на инфраструктуре SkyCapital

Ультрасовременный одностраничный обменник **RUB ⇄ Crypto через СБП (C2B, без P2P)**.

> ⚠️ Сейчас фронт работает на **Mock-адаптере**. Когда SkyCapital выдаст API — просто положи ключи в `.env` и переключи `VITE_SKYCAPITAL_MODE=live`.

## Быстрый старт

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Интеграция со SkyCapital API (когда будет)

1. Скопируй `.env.example` → `.env`
2. Заполни:
```env
VITE_SKYCAPITAL_MODE=live
VITE_SKYCAPITAL_API_URL=https://api.skycapital.group/v1
VITE_SKYCAPITAL_API_KEY=sk_xxx
VITE_SKYCAPITAL_WEBHOOK_SECRET=wh_xxx
```
3. Реализуй 4 метода в `src/lib/skycapital-client.ts` по спекам из `docs/SKYCAPITAL-API-TODO.md`:
   - `getRate()` — курс + фиксация
   - `createOrder()` — создание заявки
   - `getOrderStatus()` — статусы / СБП QR
   - `kycLink()` — ссылка на KYC/AML при необходимости

Вся бизнес-логика виджета уже идёт **только** через `SkyCapitalClient` (`src/lib/api.ts`), поэтому замена mock → live — это 1 файл.

## Что внутри

- `src/components/ExchangeWidget.tsx` — виджет обмена: направления, суммы, комиссия, шаги заявка → оплата → статус
- `src/lib/currencies.ts` — направления (RUB СБП, USDT TRC20/ERC20/SPL, BTC, ETH, TRX, USDC)
- `src/lib/api.ts` — единый интерфейс + mock с живым курсом
- Тёмная неоновая дизайн-система: Tailwind + Framer Motion + Lucide

## Комплаенс

СБП-эквайринг C2B от юрлица, KYC/AML, antifraud, документы по операциям. Работа в контуре 259-ФЗ и 115-ФЗ. Не P2P.

## Дорожная карта под API

См. `docs/SKYCAPITAL-API-TODO.md` — чеклист вопросов к SkyCapital (аутентификация, фиксация курса, QR СБП, вебхуки, KYC).
