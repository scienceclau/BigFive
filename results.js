function buildResultsProfile(scoredResults) {
  const profile = {};

  for (const trait in scoredResults) {
    const rawScore = scoredResults[trait].rawScore;
    const meanScore = scoredResults[trait].meanScore;

    // Convert possible raw-score range (10–50)
    // to a 0–100 scale.
    const scaleScore = Math.round(
      ((rawScore - 10) / 40) * 100
    );

    profile[trait] = {
      rawScore: rawScore,
      meanScore: meanScore,
      scaleScore: scaleScore
    };
  }

  return {
    assessment: "Big Five Personality Assessment",
    completedAt: new Date().toISOString(),
    traits: profile
  };
}
