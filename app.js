let currentQuestionIndex = 0;
const answers = {};

const responseOptions = [
  { value: 1, label: "Very Inaccurate" },
  { value: 2, label: "Moderately Inaccurate" },
  { value: 3, label: "Neither Accurate Nor Inaccurate" },
  { value: 4, label: "Moderately Accurate" },
  { value: 5, label: "Very Accurate" }
];

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  const container = document.getElementById("assessment");

  container.innerHTML = `
  <div class="assessment-progress-row">
    <div class="assessment-progress">
      Question ${questionNumber} of ${questions.length}
    </div>
  
    <button
      type="button"
      id="start-over-button"
      class="start-over-link"
    >
      Start Over
    </button>
  </div>

    <progress
      value="${questionNumber}"
      max="${questions.length}"
      aria-label="Assessment progress">
    </progress>

    <div class="question-container">
      <h2>${question.text}</h2>

      <fieldset>
        <legend class="sr-only">
          Select how accurately this statement describes you
        </legend>

        <div class="response-options">
          ${responseOptions.map(option => `
            <label class="response-option">
              <input
                type="radio"
                name="response"
                value="${option.value}"
                ${answers[question.id] === option.value ? "checked" : ""}
              >
              <span>${option.label}</span>
            </label>
          `).join("")}
        </div>
      </fieldset>

      <div id="assessment-message" aria-live="polite"></div>

      <div class="assessment-navigation">
        <button
          type="button"
          id="back-button"
          ${currentQuestionIndex === 0 ? "disabled" : ""}
        >
          Back
        </button>
      
        <button type="button" id="next-button">
          ${questionNumber === questions.length ? "See My Results" : "Next"}
        </button>
      </div>
  `;

  document
    .getElementById("back-button")
    .addEventListener("click", goBack);

  document
    .getElementById("next-button")
    .addEventListener("click", goNext);

  document
  .getElementById("start-over-button")
  .addEventListener("click", startOver);
}


function saveCurrentAnswer() {
  const selectedResponse =
    document.querySelector('input[name="response"]:checked');

  if (!selectedResponse) {
    return false;
  }

  const question = questions[currentQuestionIndex];

  answers[question.id] = Number(selectedResponse.value);

  return true;
}


function goNext() {
  const answerWasSaved = saveCurrentAnswer();

  if (!answerWasSaved) {
    document.getElementById("assessment-message").textContent =
      "Please select a response before continuing.";

    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();

    document.getElementById("assessment").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    return;
  }

  showResults();
}


function goBack() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();

    document.getElementById("assessment").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function startOver() {
  const confirmed = window.confirm(
    "Start over? Your current responses will be cleared."
  );

  if (!confirmed) {
    return;
  }

  for (const questionId in answers) {
    delete answers[questionId];
  }

  currentQuestionIndex = 0;
  renderQuestion();
}

function showResults() {
  try {
    const results = calculateBigFiveScores(answers);

    const container = document.getElementById("assessment");

    container.innerHTML = `
      <div class="assessment-results">
        <h2>Your Big Five Results</h2>

        <pre>${JSON.stringify(results, null, 2)}</pre>
      </div>
    `;

  } catch (error) {
    document.getElementById("assessment-message").textContent =
      "There was a problem calculating your results. Please review your responses.";
  }
}

renderQuestion();

