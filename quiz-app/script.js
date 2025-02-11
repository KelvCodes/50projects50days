const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: { a: "Java", b: "C", c: "Python", d: "JavaScript" },
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        options: { a: "Central Style Sheets", b: "Cascading Style Sheets", c: "Cascading Simple Sheets", d: "Cars SUVs Sailboats" },
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        options: { a: "Hypertext Markup Language", b: "Hypertext Markdown Language", c: "Hyperloop Machine Language", d: "Helicopters Terminals Motorboats Lamborghinis" },
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        options: { a: "1996", b: "1995", c: "1994", d: "None of the above" },
        correct: "b",
    },
];

const quizContainer = document.getElementById('quiz');
const answers = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const optionsText = {
    a: document.getElementById('a_text'),
    b: document.getElementById('b_text'),
    c: document.getElementById('c_text'),
    d: document.getElementById('d_text'),
};
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const { question, options } = quizData[currentQuiz];
    questionEl.innerText = question;
    
    Object.keys(optionsText).forEach(key => {
        optionsText[key].innerText = options[key];
    });
}

function deselectAnswers() {
    answers.forEach(answer => (answer.checked = false));
}

function getSelected() {
    return [...answers].find(answer => answer.checked)?.id || null;
}

submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();

    if (!selectedAnswer) {
        alert("Please select an answer before submitting!");
        return;
    }

    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        quizContainer.innerHTML = `
            <h2>🎉 You scored ${score}/${quizData.length} correctly! 🎯</h2>
            <p>Want to try again?</p>
            <button onclick="location.reload()">Restart Quiz</button>
        `;
    }
});
