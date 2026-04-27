const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const bestScoreDisplay = document.getElementById("bestScore");
const gameStatus = document.getElementById("gameStatus");
const restartButton = document.getElementById("restartButton");

const icons = [
    "fa-heart",
    "fa-star",
    "fa-bell",
    "fa-car",
    "fa-cloud",
    "fa-moon",
    "fa-leaf",
    "fa-sun"
];

const bestScoreKey = "memoryGameBestScore";

let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let matchedCount = 0;
let gameStarted = false;
let time = 0;
let timer = null;

function shuffleCards(cards) {
    return [...cards].sort(() => Math.random() - 0.5);
}

function renderBoard() {
    board.innerHTML = "";

    const gameCards = shuffleCards([...icons, ...icons]);

    gameCards.forEach((icon, index) => {
        const card = document.createElement("button");
        card.className = "card";
        card.type = "button";
        card.dataset.icon = icon;
        card.setAttribute("aria-label", `Card ${index + 1}`);
        card.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i>`;
        card.addEventListener("click", handleCardClick);
        board.appendChild(card);
    });
}

function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    if (lock || clickedCard === firstCard || clickedCard.classList.contains("matched")) {
        return;
    }

    if (!gameStarted) {
        startStopwatch();
    }

    flipCard(clickedCard);

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
}

function flipCard(card) {
    card.classList.add("flipped");
    card.setAttribute("aria-pressed", "true");
}

function startStopwatch() {
    if (gameStarted) return;
    gameStarted = true;
    gameStatus.textContent = "Game in progress...";
    gameStatus.classList.remove("win");

    timer = setInterval(() => {
        time++;
        timerDisplay.textContent = time;
    }, 1000);
}

function checkMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        markMatchedCards();
        return;
    }

    hideUnmatchedCards();
}

function markMatchedCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard.disabled = true;
    secondCard.disabled = true;
    matchedCount++;

    if (matchedCount === icons.length) {
        finishGame();
    }

    resetSelection();
}

function hideUnmatchedCards() {
    lock = true;

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard.setAttribute("aria-pressed", "false");
        secondCard.setAttribute("aria-pressed", "false");
        resetSelection();
    }, 800);
}

function finishGame() {
    clearInterval(timer);
    gameStarted = false;
    gameStatus.textContent = `You won in ${moves} moves and ${time} seconds.`;
    gameStatus.classList.add("win");
    saveBestScore();
}

function saveBestScore() {
    const currentScore = { moves, time };
    const savedScore = getBestScore();

    if (!savedScore || moves < savedScore.moves || (moves === savedScore.moves && time < savedScore.time)) {
        localStorage.setItem(bestScoreKey, JSON.stringify(currentScore));
        updateBestScore();
    }
}

function getBestScore() {
    const savedScore = localStorage.getItem(bestScoreKey);

    if (!savedScore) {
        return null;
    }

    try {
        return JSON.parse(savedScore);
    } catch {
        localStorage.removeItem(bestScoreKey);
        return null;
    }
}

function updateBestScore() {
    const savedScore = getBestScore();
    bestScoreDisplay.textContent = savedScore ? `${savedScore.moves} / ${savedScore.time}s` : "--";
}

function restartGame() {
    clearInterval(timer);
    firstCard = null;
    secondCard = null;
    lock = false;
    moves = 0;
    matchedCount = 0;
    gameStarted = false;
    time = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = time;
    gameStatus.textContent = "Find all 8 matching pairs.";
    gameStatus.classList.remove("win");
    renderBoard();
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

restartButton.addEventListener("click", restartGame);

updateBestScore();
restartGame();
