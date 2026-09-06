import { and, asc, eq, gte } from "drizzle-orm";
import { getArgentinaRates, getLatamQuotes, type Quote } from "@/lib/dolarapi";
import { getDb } from "./client";
import { rateSnapshots } from "./schema";

function toRow(q: Quote) {
  return {
    compra: q.compra?.toString(),
    venta: q.venta?.toString(),
    variacionPct: q.variacionPct?.toString(),
  };
}

export async function captureSnapshot() {
  const arRates = await getArgentinaRates();
  const latamQuotes = await getLatamQuotes(arRates?.oficial ?? null);

  const rows: (typeof rateSnapshots.$inferInsert)[] = [];

  if (arRates) {
    rows.push(
      { series: "AR_OFICIAL", ...toRow(arRates.oficial) },
      { series: "AR_BLUE", ...toRow(arRates.blue) },
      { series: "AR_MEP", ...toRow(arRates.mep) },
      { series: "AR_CCL", ...toRow(arRates.ccl) }
    );
  }
  for (const q of latamQuotes) {
    if (q.code === "AR") continue; // already captured above as AR_OFICIAL
    rows.push({ series: q.code, ...toRow(q.quote) });
  }

  if (rows.length > 0) {
    await getDb().insert(rateSnapshots).values(rows);
  }

  return { inserted: rows.length, capturedAt: new Date().toISOString() };
}

export async function getSeriesHistory(series: string, since: Date) {
  return getDb()
    .select()
    .from(rateSnapshots)
    .where(and(eq(rateSnapshots.series, series), gte(rateSnapshots.capturedAt, since)))
    .orderBy(asc(rateSnapshots.capturedAt));
}
