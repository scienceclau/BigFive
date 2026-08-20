function buildResultsProfile(scoredResults) {
  const profile = {};

  for (const trait in scoredResults) {
    const rawScore = scoredResults[trait].rawScore;
    const meanScore = scoredResults[trait].meanScore;

    profile[trait] = {
      rawScore: rawScore,
      meanScore: meanScore
    };
  }

  return {
    assessment: "Big Five Personality Assessment",
    completedAt: new Date().toISOString(),
    traits: profile
  };
}
