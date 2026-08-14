const scoringKey = {
  1:  { trait: "Extraversion", direction: "+" },
  2:  { trait: "Agreeableness", direction: "-" },
  3:  { trait: "Conscientiousness", direction: "+" },
  4:  { trait: "Emotional Stability", direction: "-" },
  5:  { trait: "Intellect/Imagination", direction: "+" },

  6:  { trait: "Extraversion", direction: "-" },
  7:  { trait: "Agreeableness", direction: "+" },
  8:  { trait: "Conscientiousness", direction: "-" },
  9:  { trait: "Emotional Stability", direction: "+" },
  10: { trait: "Intellect/Imagination", direction: "-" },

  11: { trait: "Extraversion", direction: "+" },
  12: { trait: "Agreeableness", direction: "-" },
  13: { trait: "Conscientiousness", direction: "+" },
  14: { trait: "Emotional Stability", direction: "-" },
  15: { trait: "Intellect/Imagination", direction: "+" },

  16: { trait: "Extraversion", direction: "-" },
  17: { trait: "Agreeableness", direction: "+" },
  18: { trait: "Conscientiousness", direction: "-" },
  19: { trait: "Emotional Stability", direction: "+" },
  20: { trait: "Intellect/Imagination", direction: "-" },

  21: { trait: "Extraversion", direction: "+" },
  22: { trait: "Agreeableness", direction: "-" },
  23: { trait: "Conscientiousness", direction: "+" },
  24: { trait: "Emotional Stability", direction: "-" },
  25: { trait: "Intellect/Imagination", direction: "+" },

  26: { trait: "Extraversion", direction: "-" },
  27: { trait: "Agreeableness", direction: "+" },
  28: { trait: "Conscientiousness", direction: "-" },
  29: { trait: "Emotional Stability", direction: "-" },
  30: { trait: "Intellect/Imagination", direction: "-" },

  31: { trait: "Extraversion", direction: "+" },
  32: { trait: "Agreeableness", direction: "-" },
  33: { trait: "Conscientiousness", direction: "+" },
  34: { trait: "Emotional Stability", direction: "-" },
  35: { trait: "Intellect/Imagination", direction: "+" },

  36: { trait: "Extraversion", direction: "-" },
  37: { trait: "Agreeableness", direction: "+" },
  38: { trait: "Conscientiousness", direction: "-" },
  39: { trait: "Emotional Stability", direction: "-" },
  40: { trait: "Intellect/Imagination", direction: "+" },

  41: { trait: "Extraversion", direction: "+" },
  42: { trait: "Agreeableness", direction: "+" },
  43: { trait: "Conscientiousness", direction: "+" },
  44: { trait: "Emotional Stability", direction: "-" },
  45: { trait: "Intellect/Imagination", direction: "+" },

  46: { trait: "Extraversion", direction: "-" },
  47: { trait: "Agreeableness", direction: "+" },
  48: { trait: "Conscientiousness", direction: "+" },
  49: { trait: "Emotional Stability", direction: "-" },
  50: { trait: "Intellect/Imagination", direction: "+" }
};

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
