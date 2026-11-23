import { createNeonAuth } from "@neon/auth/next/server";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || "",
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET || "",
  },
});

export async function testAuthConfiguration() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const jwksUrl = process.env.NEON_AUTH_JWKS_URL;

  if (!baseUrl) {
    throw new Error("NEON_AUTH_BASE_URL is not configured");
  }

  // Probe JWKS or base auth discovery endpoint
  const targetUrl = jwksUrl || `${baseUrl}/.well-known/jwks.json`;
  const res = await fetch(targetUrl);
  
  if (!res.ok && res.status !== 200) {
    throw new Error(`Neon Auth JWKS endpoint returned status ${res.status}`);
  }

  const jwksData = await res.json();
  const keyCount = Array.isArray(jwksData?.keys) ? jwksData.keys.length : 0;

  return {
    baseUrl,
    jwksUrl: targetUrl,
    keyCount,
    status: "ok",
  };
}

