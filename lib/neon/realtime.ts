import { createRealtime, rawSql } from "@neon/realtime/server";
import { createRealtimeClient } from "@neon/realtime/client";

export const realtimeServer = createRealtime({
  secret: process.env.NEON_REALTIME_SECRET || "",
  db: "neondb",
});

export const getRealtimeClient = () => {
  const url = process.env.NEXT_PUBLIC_NEON_REALTIME_URL || process.env.NEON_REALTIME_URL || "";
  return createRealtimeClient({ url });
};

export async function testRealtimeServer() {
  const secret = process.env.NEON_REALTIME_SECRET;
  if (!secret) {
    throw new Error("NEON_REALTIME_SECRET is missing");
  }

  // Seal a test query to verify query sealing engine
  const query = rawSql<{ ping: number }>("SELECT 1 as ping", []);
  const sealed = await realtimeServer.seal({ query });

  return {
    realtimeUrl: process.env.NEXT_PUBLIC_NEON_REALTIME_URL || process.env.NEON_REALTIME_URL,
    sealedQueryLength: JSON.stringify(sealed).length,
    status: "ok",
  };
}

