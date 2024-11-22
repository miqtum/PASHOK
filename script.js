
let currentQuestionIndex = 0;
let questions = [];

// Загружаем вопросы из JSON
function loadQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion(currentQuestionIndex);
        })
        .catch(error => console.error('Ошибка загрузки вопросов:', error));
    console.log(currentQuestionIndex);
}

// Отображаем текущий вопрос
function showQuestion(index) {
    const quizContainer = document.getElementById("quiz");
    const question = questions[index].question;
    const answers = questions[index].answers;

    quizContainer.innerHTML = `
        <h2 id="question">${question}</h2>
        <button onclick="checkAnswer(0)">${answers[0]}</button>
        <button onclick="checkAnswer(1)">${answers[1]}</button>
    `;
}

// Проверка ответа пользователя
function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correctIndex;
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");

    if (selectedIndex === correctIndex) {
        if (currentQuestionIndex === questions.length - 1) {
            modalText.textContent = "MAC ХУЯК!";
            currentQuestionIndex = 0;
        } else {
            modalText.textContent = questions[currentQuestionIndex].rightMessage;
            // currentQuestionIndex++;
        }
    } else {
        modalText.textContent = questions[currentQuestionIndex].wrongMessage;
    }

    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    setTimeout(() => {
        closeModal();
        if (modalText.textContent === "MAC ХУЯК!") {
            window.location.href = 'final.html'; // Переход на final.html
        } else if (modalText.textContent === questions[currentQuestionIndex].rightMessage) {
            showQuestion(++currentQuestionIndex);
            console.log(currentQuestionIndex);
        }
    }, 2000);
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("show");

    setTimeout(() => {
        modal.style.display = "none";
    }, 500);
}

let isSoundOn = true;

window.onload = function () {
    const soundButton = document.querySelector('.sound-toggle');
    soundButton.onclick = toggleSound;

    const audio = document.getElementById('background-music');
    audio.volume = 0.1;
    audio.play().catch(error => {
        console.log("Не удалось воспроизвести звук, требуется действие пользователя.");
    });
};


// Инициализация страницы при загрузке
window.onload = function () {
    const quiz = document.getElementById("quiz");
    quiz.classList.add("show");
    loadQuestions();
};