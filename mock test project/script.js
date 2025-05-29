let currentQuestionIndex = 0;
let questions = [];

fetch("./questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

function showQuestion() {
    if (!questions.length) {
        document.getElementById("quiz-container").innerHTML = "<h2>Error: Questions Not Loaded! ⚠️</h2>";
        return;
    }

    if (currentQuestionIndex >= questions.length) {
        document.getElementById("quiz-container").innerHTML = "<h2>Test Completed! 🚀</h2>";
        return;
    }

    let questionData = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = questionData.question;

    let answerList = document.getElementById("answer-options");
    answerList.innerHTML = "";
    questionData.options.forEach((option, index) => {
        let li = document.createElement("li");
        li.innerText = option;
        li.onclick = () => checkAnswer(index, questionData.correct);
        answerList.appendChild(li);
    });
}

function checkAnswer(selectedIndex, correctIndex) {
    let feedback = document.getElementById("feedback");
    if (selectedIndex === correctIndex) {
        feedback.innerHTML = "<span style='color: green;'>✅ Correct!</span>";
    } else {
        feedback.innerHTML = `<span style='color: red;'>❌ Incorrect! Correct Answer: ${questions[currentQuestionIndex].options[correctIndex]}</span>`;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById("feedback").innerHTML = "";
    showQuestion();
}
