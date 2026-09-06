"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArVariantView, LatamRow } from "@/lib/format";

// ---------------------------------------------------------------------------
// Icons (inline SVG, no external icon library installed)
// ---------------------------------------------------------------------------

function IconSun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

function IconMoon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </svg>
  );
}

function IconBolt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function IconGlobe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </svg>
  );
}

function IconBarChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="4" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="7" width="4" height="13" rx="1" />
      <rect x="16" y="3" width="4" height="17" rx="1" />
    </svg>
  );
}

function IconTriangleUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" {...props}>
      <polygon points="5,1 9,9 1,9" />
    </svg>
  );
}

function IconTriangleDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" {...props}>
      <polygon points="1,1 9,1 5,9" />
    </svg>
  );
}

function IconCoin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="11" className="fill-emerald-500" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">
        $
      </text>
    </svg>
  );
}

function IconHandshake(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12l5-4 4 3 3-3 8 4" />
      <path d="M6 15l3 3 3-2 3 3 4-4" />
    </svg>
  );
}

function IconNewspaper(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="14" height="14" rx="1" />
      <path d="M17 8h4v9a2 2 0 01-2 2H7" />
      <path d="M7 9h6M7 12h6M7 15h4" />
    </svg>
  );
}

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function SocialX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function SocialFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 4h-2a4 4 0 00-4 4v3H7v3h2v6h3v-6h2.5l.5-3H12V8a1 1 0 011-1h2z" />
    </svg>
  );
}

function SocialInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialYoutube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <polygon points="11,9.5 11,14.5 15,12" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Static content (not covered by DolarApi — out of scope for the API wiring)
// ---------------------------------------------------------------------------

const news = [
  {
    icon: "💵",
    iconBg: "bg-emerald-100",
    title: "El dólar oficial volvió a subir y cerró en $1.350 en Argentina",
    date: "25 ago 2025 - 12:45",
  },
  {
    icon: "🇧🇷",
    iconBg: "bg-blue-100",
    title: "El real brasileño se fortalece tras nuevos datos de inflación",
    date: "25 ago 2025 - 10:32",
  },
  {
    icon: "📈",
    iconBg: "bg-amber-100",
    title: "Qué se espera para el dólar en Latinoamérica la próxima semana",
    date: "24 ago 2025 - 18:20",
  },
];

const footerLinks = ["Inicio", "Países", "Historial", "Noticias", "Calculadora"];
const footerCountries = ["Argentina", "Brasil", "Uruguay", "Chile", "Colombia"];

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

type HomeViewProps = {
  arVariants: ArVariantView[];
  latamRows: LatamRow[];
  lastUpdatedLabel: string;
};

export default function HomeView({ arVariants, latamRows, lastUpdatedLabel }: HomeViewProps) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }

  return (
    <div className="flex-1 w-full bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
              $
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Dolar<span className="text-emerald-500">Latam</span>
              </span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                Cotizaciones del dólar en Latinoamérica
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <Link href="/" className="relative pb-4 pt-4 text-slate-900 dark:text-white">
              Inicio
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-500" />
            </Link>
            <a href="#paises" className="pb-4 pt-4 hover:text-slate-900 dark:hover:text-white">
              Países
            </a>
            <a href="#historial" className="pb-4 pt-4 hover:text-slate-900 dark:hover:text-white">
              Historial
            </a>
            <a href="#noticias" className="pb-4 pt-4 hover:text-slate-900 dark:hover:text-white">
              Noticias
            </a>
            <a href="#calculadora" className="pb-4 pt-4 hover:text-slate-900 dark:hover:text-white">
              Calculadora
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Cambiar tema"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {darkMode ? <IconMoon className="h-5 w-5" /> : <IconSun className="h-5 w-5" />}
            </button>
            <button
              type="button"
              aria-label="Buscar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <IconSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.9) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            clipPath:
              "polygon(55% 0%, 68% 10%, 62% 22%, 78% 30%, 70% 45%, 82% 55%, 65% 68%, 70% 85%, 50% 100%, 42% 82%, 30% 70%, 38% 55%, 22% 42%, 35% 30%, 28% 15%, 45% 12%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_336px] lg:items-center lg:px-8">
          <div>
            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              El dólar en Latinoamérica,
              <br />
              <span className="text-emerald-400">en un solo lugar</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
              Consultá las cotizaciones del dólar oficial, blue y otras variantes en todos los países de
              Latinoamérica, actualizadas en tiempo real.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <IconBolt className="h-4 w-4 text-emerald-400" />
                Actualización en tiempo real
              </div>
              <div className="flex items-center gap-2">
                <IconGlobe className="h-4 w-4 text-emerald-400" />
                Todas las monedas de la región
              </div>
              <div className="flex items-center gap-2">
                <IconBarChart className="h-4 w-4 text-emerald-400" />
                Historial de cotizaciones
              </div>
            </div>
          </div>

          {/* Ad placeholder */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-lg">
            <span className="absolute right-3 top-3 text-[10px] font-medium uppercase tracking-wide text-blue-200">
              Publicidad
            </span>
            <p className="text-2xl font-bold text-white">SkyNet</p>
            <p className="mt-3 max-w-[220px] text-sm leading-6 text-blue-100">
              Internet de alta velocidad para todo lo que hacés.
            </p>
            <button
              type="button"
              className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Conocé más →
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <IconCoin className="h-6 w-6" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Cotizaciones del dólar en Latinoamérica
                  </h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Última actualización: {lastUpdatedLabel}
                </span>
              </div>

              <div className="overflow-x-auto px-1 pb-2 pt-2">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr className="border-y border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                      <th className="px-4 py-3 font-semibold">País</th>
                      <th className="px-4 py-3 font-semibold">Moneda</th>
                      <th className="px-4 py-3 text-right font-semibold">Compra</th>
                      <th className="px-4 py-3 text-right font-semibold">Venta</th>
                      <th className="px-4 py-3 text-right font-semibold">Var. 24h</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latamRows.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          No se pudieron cargar las cotizaciones en este momento.
                        </td>
                      </tr>
                    )}
                    {latamRows.map((row) => (
                      <tr
                        key={row.code}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:border-slate-800/60 dark:hover:bg-slate-800/40"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-base leading-none dark:bg-slate-800">
                              {row.flag}
                            </span>
                            <span className="font-medium text-slate-900 dark:text-white">{row.country}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{row.currency}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-900 dark:text-white">
                          {row.compraLabel}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-900 dark:text-white">
                          {row.ventaLabel}
                        </td>
                        <td className="px-4 py-3">
                          {row.changeLabel ? (
                            <div
                              className={`flex items-center justify-end gap-1 font-medium ${
                                row.changeUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              {row.changeUp ? (
                                <IconTriangleUp className="h-2.5 w-2.5" />
                              ) : (
                                <IconTriangleDown className="h-2.5 w-2.5" />
                              )}
                              {row.changeLabel}
                            </div>
                          ) : (
                            <div className="text-right text-slate-400 dark:text-slate-500">—</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Marketplace ad placeholder */}
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:flex-row dark:border-amber-900/40 dark:bg-amber-950/20">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white">
                  <IconHandshake className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    MercadoPlus <span className="ml-1 text-xs font-normal text-slate-400">· Publicidad</span>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Tus compras, sin límites. Encontrá todo lo que necesitás, en un solo lugar.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-full shrink-0 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300 sm:w-auto"
              >
                Ver ofertas →
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Crypto ad placeholder */}
            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold tracking-wide text-amber-400">CRYPTOTRADE</p>
                <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Publicidad</span>
              </div>
              <p className="mt-4 text-lg font-bold leading-6">Tradea cripto desde cualquier lugar</p>
              <p className="mt-2 text-sm text-slate-300">Más de 350 criptomonedas. Bajas comisiones.</p>
              <button
                type="button"
                className="mt-5 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-300"
              >
                Comenzar ahora →
              </button>
            </div>

            {/* Argentina detail */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <IconBarChart className="h-4 w-4 text-emerald-500" />
                Cotizaciones en Argentina hoy
              </h3>

              {arVariants.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  No se pudieron cargar las cotizaciones de Argentina en este momento.
                </p>
              ) : (
                <div className="mt-5 grid grid-cols-4 gap-3">
                  {arVariants.map((v) => {
                    const barPx = Math.max((v.barPct / 100) * 120, 8);
                    return (
                      <div key={v.label} className="flex flex-col items-center gap-2">
                        <span
                          className={`flex items-center gap-0.5 text-[10px] font-medium ${
                            v.changeUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {v.changeLabel != null &&
                            (v.changeUp ? (
                              <IconTriangleUp className="h-2 w-2" />
                            ) : (
                              <IconTriangleDown className="h-2 w-2" />
                            ))}
                          {v.changeLabel ?? "—"}
                        </span>
                        <div className="flex h-[120px] w-full items-end justify-center">
                          <div
                            className="w-8 rounded-t-md bg-emerald-500 dark:bg-emerald-400"
                            style={{ height: `${barPx}px` }}
                          />
                        </div>
                        <span className="text-xs font-semibold tabular-nums text-slate-900 dark:text-white">
                          {v.ventaLabel}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{v.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* News */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <IconNewspaper className="h-4 w-4 text-emerald-500" />
                  Noticias recientes
                </h3>
                <a href="#noticias" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
                  Ver todas →
                </a>
              </div>
              <ul className="mt-4 flex flex-col gap-4">
                {news.map((n) => (
                  <li key={n.title} className="flex gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg ${n.iconBg}`}>
                      {n.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-snug text-slate-900 hover:text-emerald-600 dark:text-white">
                        {n.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{n.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                  $
                </span>
                <span className="text-lg font-bold text-white">
                  Dolar<span className="text-emerald-400">Latam</span>
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-slate-400">Cotizaciones del dólar en Latinoamérica</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Enlaces</p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-slate-400">
                {footerLinks.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-emerald-400">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Países</p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm text-slate-400">
                {footerCountries.map((c) => (
                  <li key={c}>
                    <a href="#" className="hover:text-emerald-400">
                      {c}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="font-medium text-emerald-400 hover:text-emerald-300">
                    Ver todos →
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Recibí las últimas actualizaciones</p>
              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <IconMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Tu email"
                    className="w-full rounded-full border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
                >
                  Suscribirme
                </button>
              </form>
              <div className="mt-5 flex items-center gap-3 text-slate-400">
                <a href="#" aria-label="X" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-800 hover:text-white">
                  <SocialX className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-800 hover:text-white">
                  <SocialFacebook className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-800 hover:text-white">
                  <SocialInstagram className="h-4 w-4" />
                </a>
                <a href="#" aria-label="YouTube" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-800 hover:text-white">
                  <SocialYoutube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
            <p>© 2025 DolarLatam. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-300">
                Términos y condiciones
              </a>
              <a href="#" className="hover:text-slate-300">
                Política de privacidad
              </a>
              <a href="#" className="hover:text-slate-300">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
