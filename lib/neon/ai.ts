import { neon } from "@neon/ai-sdk-provider";

export const aiProvider = neon;

export async function checkAiGateway() {
  const baseUrl = process.env.NEON_AI_GATEWAY_BASE_URL;
  const token = process.env.NEON_AI_GATEWAY_TOKEN;

  if (!baseUrl || !token) {
    throw new Error("NEON_AI_GATEWAY_BASE_URL or NEON_AI_GATEWAY_TOKEN is missing");
  }

  // Query unified models discovery endpoint /v1/models
  const res = await fetch(`${baseUrl}/v1/models`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`AI Gateway responded with HTTP ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const models = Array.isArray(data?.data) ? data.data : [];

  const sampleModels = models.slice(0, 5).map((m: { id: string; name: string; owned_by: string; enabled: boolean; unavailable_reason?: string }) => ({
    id: m.id,
    name: m.name,
    owned_by: m.owned_by,
    enabled: m.enabled,
    unavailable_reason: m.unavailable_reason,
  }));

  const enabledCount = models.filter((m: { enabled: boolean }) => m.enabled).length;

  return {
    totalModels: models.length,
    enabledCount,
    sampleModels,
    requestContext: data.request_context_availability,
    status: "ok",
  };
}

