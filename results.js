function buildResultsProfile(scoredResults) {
  const profile = {};

  // Openness to Experience
  {
    const rawScore = scoredResults["Intellect/Imagination"].rawScore;
    const meanScore = scoredResults["Intellect/Imagination"].meanScore;
    const scaleScore = Math.round(((rawScore - 10) / 40) * 100);

    profile["Openness to Experience"] = {
      rawScore,
      meanScore,
      scaleScore
    };
  }

  // Conscientiousness
  {
    const rawScore = scoredResults["Conscientiousness"].rawScore;
    const meanScore = scoredResults["Conscientiousness"].meanScore;
    const scaleScore = Math.round(((rawScore - 10) / 40) * 100);

    profile["Conscientiousness"] = {
      rawScore,
      meanScore,
      scaleScore
    };
  }

  // Extraversion
  {
    const rawScore = scoredResults["Extraversion"].rawScore;
    const meanScore = scoredResults["Extraversion"].meanScore;
    const scaleScore = Math.round(((rawScore - 10) / 40) * 100);

    profile["Extraversion"] = {
      rawScore,
      meanScore,
      scaleScore
    };
  }

  // Agreeableness
  {
    const rawScore = scoredResults["Agreeableness"].rawScore;
    const meanScore = scoredResults["Agreeableness"].meanScore;
    const scaleScore = Math.round(((rawScore - 10) / 40) * 100);

    profile["Agreeableness"] = {
      rawScore,
      meanScore,
      scaleScore
    };
  }

  // Neuroticism = inverse of Emotional Stability
  {
    const emotionalStabilityRaw =
      scoredResults["Emotional Stability"].rawScore;

    const emotionalStabilityMean =
      scoredResults["Emotional Stability"].meanScore;

    const emotionalStabilityScale =
      Math.round(((emotionalStabilityRaw - 10) / 40) * 100);

    const neuroticismScale = 100 - emotionalStabilityScale;

    profile["Neuroticism"] = {
      rawScore: 60 - emotionalStabilityRaw,
      meanScore: Number((6 - emotionalStabilityMean).toFixed(2)),
      scaleScore: neuroticismScale
    };
  }

  return {
    assessment: "Big Five Personality Assessment",
    completedAt: new Date().toISOString(),
    traits: profile
  };
}
