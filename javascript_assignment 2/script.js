let score = 0, timerInterval, currentQuestion = 0, questions = [];
const categoryMap = {
    "General Knowledge": 9,
    "Science": 17,
    "History": 23,
    "Technology": 18,
    "Sports": 21
};

async function fetchQuestions() {
    let selectedCategory = document.getElementById('category').value;
    let categoryID = categoryMap[selectedCategory];
    const response = await fetch(`https://opentdb.com/api.php?amount=20&category=${categoryID}&type=multiple`);
    const data = await response.json();
    questions = data.results;
    loadQuestion(); 
}

function startGame() {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';
    fetchQuestions();
}

function loadQuestion() {
    if (currentQuestion >= 20) {
        showResult();
        return;
    }
    clearInterval(timerInterval);
    let question = questions[currentQuestion];
    document.getElementById('question').innerHTML = `Q${currentQuestion + 1}. ${question.question}`;
    let options = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);
    document.getElementById('options').innerHTML = options.map((opt, i) =>
        `<div onclick="checkAnswer('${opt}', '${question.correct_answer}')" class="option"> ${String.fromCharCode(97 + i)}. ${opt}</div>`
    ).join("");
    startTimer();
}

function startTimer() {
    let time = 15;
    document.getElementById('timer').textContent = time;
    timerInterval = setInterval(() => {
        time--;
        document.getElementById('timer').textContent = time;
        if (time === 0) {
            clearInterval(timerInterval);
            showCorrectAnswer();
        }
    }, 1000);
}

function checkAnswer(selected, correct) {
    clearInterval(timerInterval);
    document.querySelectorAll('.option').forEach(opt => {
        if (opt.textContent.includes(correct)) opt.classList.add('correct');
        if (opt.textContent.includes(selected) && selected !== correct) opt.classList.add('wrong');
    });
    if (selected === correct) score++;
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2000); 
}

function showCorrectAnswer() {
    document.querySelectorAll('.option').forEach(opt => {
        if (opt.textContent.includes(questions[currentQuestion].correct_answer)) {
            opt.classList.add('correct');
        }
    });
    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 2000); }

function showResult() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.querySelector('.result-screen').style.display = 'block';
    document.getElementById('score').textContent = `${score}/20`;
}

function restartGame() {
    location.reload();
}

function exitGame() {
    location.reload();
}