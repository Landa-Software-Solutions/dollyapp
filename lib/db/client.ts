import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Reuse the TCP connection across invocations (hot-reloads in dev, warm
// serverless instances in prod) instead of opening a new one per call.
const globalForDb = globalThis as unknown as { dbConnection?: postgres.Sql };

// Lazy on purpose: importing this module must never throw. The connection
// (and the DATABASE_URL validation) only happens the first time a caller
// actually needs the database — e.g. inside the route handler, after the
// auth check has already run. Creating it eagerly at module scope made an
// unauthenticated request to /api/cron/capture-rates 500 before the
// Authorization header was even checked, instead of a clean 401.
export function getDb() {
  if (!globalForDb.dbConnection) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    // `prepare: false` is required when DATABASE_URL points at Supabase's
    // Transaction pooler (port 6543) — pgbouncer in transaction mode doesn't
    // support protocol-level prepared statements, which postgres.js uses by
    // default. Harmless against a direct/session connection too.
    globalForDb.dbConnection = postgres(connectionString, { prepare: false });
  }
  return drizzle(globalForDb.dbConnection, { schema });
}
