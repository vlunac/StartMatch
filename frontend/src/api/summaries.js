// AI startup summary API client methods.

import client from "./client";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;
let startupNameToIdCache = null;

function isObjectId(value) {
  return typeof value === "string" && OBJECT_ID_REGEX.test(value);
}

async function getBackendStartupIdByName(name) {
  if (!name) return null;

  if (!startupNameToIdCache) {
    const { data } = await client.get("/startups", { params: { limit: 100 } });
    startupNameToIdCache = new Map(
      data
        .filter(s => s?.id && s?.name)
        .map(s => [String(s.name).trim().toLowerCase(), s.id]),
    );
  }

  return startupNameToIdCache.get(String(name).trim().toLowerCase()) || null;
}

export async function getAiSummary(startup) {
  const startupId = typeof startup === "object" ? startup?.id : startup;
  const startupName = typeof startup === "object" ? startup?.name : null;

  try {
    let backendStartupId = isObjectId(startupId) ? startupId : null;

    // Mock cards use numeric IDs; resolve to seeded backend startup by name.
    if (!backendStartupId && startupName) {
      backendStartupId = await getBackendStartupIdByName(startupName);
    }

    if (!backendStartupId) return "Summary unavailable.";

    const { data } = await client.post(`/summaries/${backendStartupId}`);
    return data?.summary || "Summary unavailable.";
  } catch {
    return "Summary unavailable.";
  }
}

