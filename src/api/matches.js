// src/api/matches.js
import { mockMatches, mockStartups, mockInvestors } from "./mockData";

export async function getRecommended(role, userId) {
  await new Promise((r) => setTimeout(r, 500));
  if (role === "investor") {
    const myMatches = mockMatches.filter((m) => m.investorId === userId);
    return myMatches
      .map((m) => ({
        ...mockStartups.find((s) => s.id === m.startupId),
        matchScore: m.score,
      }))
      .filter(Boolean)
      .sort((a, b) => b.matchScore - a.matchScore);
  } else {
    const myMatches = mockMatches.filter((m) => m.startupId === userId);
    return myMatches
      .map((m) => ({
        ...mockInvestors.find((i) => i.id === m.investorId),
        matchScore: m.score,
      }))
      .filter(Boolean)
      .sort((a, b) => b.matchScore - a.matchScore);
  }
}

export async function getMatchScore(investorId, startupId) {
  await new Promise((r) => setTimeout(r, 200));
  const match = mockMatches.find(
    (m) => m.investorId === Number(investorId) && m.startupId === Number(startupId)
  );
  return match?.score ?? Math.floor(60 + Math.random() * 35);
}
