// Presentation formatting — Intl.* must run only on the server.
// Running it inside the Client Component caused hydration mismatches:
// Node's ICU and the browser's ICU render the same date/number slightly
// differently (e.g. spacing around "p. m."), so React's strict string
// comparison flagged it even though the text looked identical on screen.
import type { ArgentinaRates, CountryQuote, Quote } from "./dolarapi";

const CURRENCY_SYMBOLS: Record<string, string> = {
  ARS: "$",
  BRL: "R$",
  UYU: "$",
  CLP: "$",
  COP: "$",
  MXN: "$",
  BOB: "Bs",
  VES: "Bs",
};

function formatMoney(value: number | null, currency: string): string {
  if (value == null) return "—";
  const symbol = CURRENCY_SYMBOLS[currency] ?? "";
  const number = new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  return `${symbol} ${number}`;
}

function formatChangeLabel(pct: number | null): string | null {
  if (pct == null) return null;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
}

function isPositive(pct: number | null): boolean {
  return pct != null && pct >= 0;
}

export function formatUpdated(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(iso));
}

export type LatamRow = {
  code: string;
  country: string;
  flag: string;
  currency: string;
  compraLabel: string;
  ventaLabel: string;
  changeLabel: string | null;
  changeUp: boolean;
};

export function buildLatamRows(quotes: CountryQuote[]): LatamRow[] {
  return quotes.map((q) => ({
    code: q.code,
    country: q.country,
    flag: q.flag,
    currency: q.currency,
    compraLabel: formatMoney(q.quote.compra, q.currency),
    ventaLabel: formatMoney(q.quote.venta, q.currency),
    changeLabel: formatChangeLabel(q.quote.variacionPct),
    changeUp: isPositive(q.quote.variacionPct),
  }));
}

export type ArVariantView = {
  label: string;
  ventaLabel: string;
  changeLabel: string | null;
  changeUp: boolean;
  barPct: number;
};

export function buildArVariants(arRates: ArgentinaRates | null): ArVariantView[] {
  if (!arRates) return [];
  const variants: { label: string; quote: Quote }[] = [
    { label: "Oficial", quote: arRates.oficial },
    { label: "Blue", quote: arRates.blue },
    { label: "MEP", quote: arRates.mep },
    { label: "CCL", quote: arRates.ccl },
  ];
  const maxVenta = Math.max(...variants.map((v) => v.quote.venta ?? 0));
  return variants.map((v) => ({
    label: v.label,
    ventaLabel: formatMoney(v.quote.venta, "ARS"),
    changeLabel: formatChangeLabel(v.quote.variacionPct),
    changeUp: isPositive(v.quote.variacionPct),
    barPct: maxVenta > 0 ? ((v.quote.venta ?? 0) / maxVenta) * 100 : 0,
  }));
}
