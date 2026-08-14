const testAnswers = {};

for (let i = 1; i <= 50; i++) {
  testAnswers[i] = 5;
}

try {
  const results = calculateBigFiveScores(testAnswers);

  document.getElementById("output").textContent =
    JSON.stringify(results, null, 2);
} catch (error) {
  document.getElementById("output").textContent =
    "ERROR: " + error.message;
}
