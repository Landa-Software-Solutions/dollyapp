import { NextResponse } from "next/server";
import { captureSnapshot } from "@/lib/db/capture";

// Not cached (Route Handlers aren't cached by default in this project's
// caching model — see node_modules/next/dist/docs/.../15-route-handlers.md).
// Call with `Authorization: Bearer $CRON_SECRET` once an hour from whichever
// cron the deployment ends up using (Vercel Cron sends this same header
// automatically when CRON_SECRET is set).
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await captureSnapshot();
  return NextResponse.json({ ok: true, ...result });
}
