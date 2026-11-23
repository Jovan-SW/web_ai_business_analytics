import { neon } from "@neondatabase/serverless";

// Serverless pooled connection for application queries
const databaseUrl = process.env.DATABASE_URL || "";

export const sql = neon(databaseUrl);

export interface PostgresHealthResult {
  connected: number;
  server_time: string;
  version: string;
}

export async function testPostgresConnection(): Promise<PostgresHealthResult> {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured in environment variables");
  }

  const rows = await sql`SELECT 1 as connected, NOW()::text as server_time, version() as version`;
  return rows[0] as PostgresHealthResult;
}

