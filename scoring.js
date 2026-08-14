function calculateBigFiveScores(answers) {
  const scores = {
    "Extraversion": 0,
    "Agreeableness": 0,
    "Conscientiousness": 0,
    "Emotional Stability": 0,
    "Intellect/Imagination": 0
  };

  const itemCounts = {
    "Extraversion": 0,
    "Agreeableness": 0,
    "Conscientiousness": 0,
    "Emotional Stability": 0,
    "Intellect/Imagination": 0
  };

  for (let questionId = 1; questionId <= 50; questionId++) {
    const answer = Number(answers[questionId]);
    const key = scoringKey[questionId];

    if (!Number.isInteger(answer) || answer < 1 || answer > 5) {
      throw new Error(`Invalid or missing response for question ${questionId}.`);
    }

    let scoredAnswer = answer;

    // Reverse-score negatively keyed items:
    // 1→5, 2→4, 3→3, 4→2, 5→1
    if (key.direction === "-") {
      scoredAnswer = 6 - answer;
    }

    scores[key.trait] += scoredAnswer;
    itemCounts[key.trait] += 1;
  }

  const results = {};

  for (const trait in scores) {
    const rawScore = scores[trait];
    const meanScore = rawScore / itemCounts[trait];

    results[trait] = {
      rawScore: rawScore,
      meanScore: Number(meanScore.toFixed(2))
    };
  }

  return results;
}
