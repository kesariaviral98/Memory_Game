const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const winMessage = document.getElementById("winMessage");
let matchedCount = 0;
let gameStarted = false;

let icons = [
    "fa-heart",
    "fa-star",
    "fa-bell",
    "fa-car",
    "fa-cloud",
    "fa-moon",
    "fa-leaf",
    "fa-sun"
];

let gameCards = [...icons, ...icons];

gameCards.sort(() => Math.random() - 0.5);

gameCards.forEach(icon => {

    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    card.classList.add("hidden")
    board.appendChild(card);

});

const cards = document.querySelectorAll(".card");

let firstCard = null;
let secondCard = null;
let lock = false;

let moves = 0;

cards.forEach(card => {

    card.addEventListener("click", function (event) {
        if (!gameStarted) startStopwatch();
        if (lock) return;

        const clickedCard = event.currentTarget;

        if (clickedCard === firstCard) return;

        clickedCard.classList.add("flipped");

        clickedCard.querySelector("i").style.visibility = "visible";
        if (!firstCard) {
            firstCard = clickedCard;
            return;
        }

        secondCard = clickedCard;
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    });
});

function checkMatch() {

    if (firstCard.innerHTML === secondCard.innerHTML) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount++;

        if (matchedCount === 8) {
            winMessage.innerHTML = "🎉 You Won!";
            clearInterval(timer);
            gameStarted = false;
        }
        reset();

    } else {

        lock = true;

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.querySelector("i").style.visibility = "hidden";
            secondCard.querySelector("i").style.visibility = "hidden";
            reset();
        }, 800);
    }
}

let time = 0;
let timer = null;

function startStopwatch() {

    if (gameStarted) return;
    gameStarted = true;

    timer = setInterval(() => {
        time++;
        document.getElementById("timer").innerText = time;
    }, 1000);
}

function reset() {
    firstCard = null;
    secondCard = null;
    lock = false;
}