import { defineConfig } from "drizzle-kit";

// drizzle-kit runs as a standalone CLI, so unlike `next dev`/`next build` it
// doesn't load .env.local on its own — load it explicitly. Fine if the file
// doesn't exist (e.g. CI/production, where DATABASE_URL is injected directly).
try {
  process.loadEnvFile(".env.local");
} catch {}

export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
