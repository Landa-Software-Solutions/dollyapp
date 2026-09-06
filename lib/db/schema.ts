import { pgTable, serial, text, numeric, timestamp, index } from "drizzle-orm/pg-core";

// One generic table for every series (Argentina's 4 variants + one quote per
// other country) so adding a new country/variant later never needs a migration.
export const rateSnapshots = pgTable(
  "rate_snapshots",
  {
    id: serial("id").primaryKey(),
    series: text("series").notNull(),
    compra: numeric("compra"),
    venta: numeric("venta"),
    variacionPct: numeric("variacion_pct"),
    capturedAt: timestamp("captured_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("rate_snapshots_series_captured_at_idx").on(t.series, t.capturedAt)]
);
