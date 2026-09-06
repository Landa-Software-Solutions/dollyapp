CREATE TABLE "rate_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"series" text NOT NULL,
	"compra" numeric,
	"venta" numeric,
	"variacion_pct" numeric,
	"captured_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "rate_snapshots_series_captured_at_idx" ON "rate_snapshots" USING btree ("series","captured_at");