// Server-only data layer for https://dolarapi.com/docs/
// Only Argentina exposes multiple market variants (oficial/blue/MEP/CCL);
// every other country exposes a single compra/venta quote.

const REVALIDATE_SECONDS = 300; // 5 min shared Next.js Data Cache window

export type Quote = {
  compra: number | null;
  venta: number | null;
  variacionPct: number | null;
  fecha: string;
};

export type ArgentinaRates = {
  oficial: Quote;
  blue: Quote;
  mep: Quote;
  ccl: Quote;
};

export type CountryCode = "AR" | "BR" | "UY" | "CL" | "CO" | "MX" | "BO" | "VE";

export type CountryQuote = {
  code: CountryCode;
  country: string;
  flag: string;
  currency: string;
  quote: Quote;
};

const COUNTRY_META: Record<CountryCode, { country: string; flag: string; currency: string }> = {
  AR: { country: "Argentina", flag: "🇦🇷", currency: "ARS" },
  BR: { country: "Brasil", flag: "🇧🇷", currency: "BRL" },
  UY: { country: "Uruguay", flag: "🇺🇾", currency: "UYU" },
  CL: { country: "Chile", flag: "🇨🇱", currency: "CLP" },
  CO: { country: "Colombia", flag: "🇨🇴", currency: "COP" },
  MX: { country: "México", flag: "🇲🇽", currency: "MXN" },
  BO: { country: "Bolivia", flag: "🇧🇴", currency: "BOB" },
  VE: { country: "Venezuela", flag: "🇻🇪", currency: "VES" },
};

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

function pctChange(current: number | null, previous: number | null | undefined): number | null {
  if (current == null || previous == null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

// ---------------------------------------------------------------------------
// Argentina — GET /v1/ambito/dolares (the only endpoint with a variacion %)
// ---------------------------------------------------------------------------

type AmbitoCotizacion = {
  casa: string;
  compra: number;
  venta: number;
  variacion: number;
  fechaActualizacion: string;
};

export async function getArgentinaRates(): Promise<ArgentinaRates | null> {
  try {
    const data = await fetchJSON<AmbitoCotizacion[]>("https://dolarapi.com/v1/ambito/dolares");
    const byCasa = new Map(data.map((c) => [c.casa, c]));
    const toQuote = (casa: string): Quote | null => {
      const c = byCasa.get(casa);
      if (!c) return null;
      return { compra: c.compra, venta: c.venta, variacionPct: c.variacion, fecha: c.fechaActualizacion };
    };
    const oficial = toQuote("oficial");
    const blue = toQuote("blue");
    const mep = toQuote("bolsa");
    const ccl = toQuote("contadoconliqui");
    if (!oficial || !blue || !mep || !ccl) return null;
    return { oficial, blue, mep, ccl };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Other countries — one quote each, normalized to the common Quote shape
// ---------------------------------------------------------------------------

type StdCotizacion = {
  compra: number | null;
  venta: number | null;
  ultimoCierre?: number;
  fechaActualizacion: string;
};

async function getChile(): Promise<Quote> {
  const c = await fetchJSON<StdCotizacion>("https://cl.dolarapi.com/v1/cotizaciones/usd");
  return { compra: c.compra, venta: c.venta, variacionPct: pctChange(c.venta, c.ultimoCierre), fecha: c.fechaActualizacion };
}

async function getUruguay(): Promise<Quote> {
  const c = await fetchJSON<StdCotizacion>("https://uy.dolarapi.com/v1/cotizaciones/usd");
  return { compra: c.compra, venta: c.venta, variacionPct: null, fecha: c.fechaActualizacion };
}

async function getMexico(): Promise<Quote> {
  const c = await fetchJSON<StdCotizacion>("https://mx.dolarapi.com/v1/cotizaciones/usd");
  return { compra: c.compra, venta: c.venta, variacionPct: null, fecha: c.fechaActualizacion };
}

async function getBolivia(): Promise<Quote> {
  const c = await fetchJSON<StdCotizacion>("https://bo.dolarapi.com/v1/dolares/oficial");
  return { compra: c.compra, venta: c.venta, variacionPct: null, fecha: c.fechaActualizacion };
}

async function getColombia(): Promise<Quote> {
  const c = await fetchJSON<StdCotizacion>("https://co.dolarapi.com/v1/cotizaciones/usd");
  return { compra: c.compra, venta: c.venta, variacionPct: pctChange(c.venta, c.ultimoCierre), fecha: c.fechaActualizacion };
}

type BrCotizacao = {
  compra: number | null;
  venda: number | null;
  fechoAnterior?: number;
  dataAtualizacao: string;
};

async function getBrasil(): Promise<Quote> {
  const c = await fetchJSON<BrCotizacao>("https://br.dolarapi.com/v1/cotacoes/usd");
  return { compra: c.compra, venta: c.venda, variacionPct: pctChange(c.venda, c.fechoAnterior), fecha: c.dataAtualizacao };
}

type VeCotizacion = {
  compra: number | null;
  venta: number | null;
  promedio: number | null;
  fechaActualizacion: string;
};

async function getVenezuela(): Promise<Quote> {
  const c = await fetchJSON<VeCotizacion>("https://ve.dolarapi.com/v1/dolares/oficial");
  return { compra: c.compra, venta: c.venta ?? c.promedio, variacionPct: null, fecha: c.fechaActualizacion };
}

const OTHER_COUNTRY_FETCHERS: Array<{ code: CountryCode; fetcher: () => Promise<Quote> }> = [
  { code: "BR", fetcher: getBrasil },
  { code: "UY", fetcher: getUruguay },
  { code: "CL", fetcher: getChile },
  { code: "CO", fetcher: getColombia },
  { code: "MX", fetcher: getMexico },
  { code: "BO", fetcher: getBolivia },
  { code: "VE", fetcher: getVenezuela },
];

export async function getLatamQuotes(arOficial: Quote | null): Promise<CountryQuote[]> {
  const quotes: CountryQuote[] = [];

  if (arOficial) {
    quotes.push({ code: "AR", ...COUNTRY_META.AR, quote: arOficial });
  }

  const settled = await Promise.allSettled(OTHER_COUNTRY_FETCHERS.map(({ fetcher }) => fetcher()));
  settled.forEach((result, i) => {
    if (result.status === "fulfilled") {
      const { code } = OTHER_COUNTRY_FETCHERS[i];
      quotes.push({ code, ...COUNTRY_META[code], quote: result.value });
    }
  });

  return quotes;
}

export function getLastUpdated(quotes: CountryQuote[]): string | null {
  const dates = quotes.map((q) => new Date(q.quote.fecha).getTime()).filter((t) => !Number.isNaN(t));
  if (dates.length === 0) return null;
  return new Date(Math.max(...dates)).toISOString();
}
