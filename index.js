const cards = document.querySelectorAll('.card-container');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let counter = document.querySelector('.move-counter');
let moves = 0;
let resetButton = document.querySelector('.reset-button');
let timer = document.querySelector('.timer');
let interval;
let deck = document.querySelector('.deck');
let minute = 0;
let seconds = 0;

function newGame() {
    location.reload();
}

function countMoves() {
    moves ++;
    counter.innerHTML = "Moves: " + moves;
}

function startTimer() {
    interval = setInterval(function() {
        seconds++;
        timer.innerHTML = minute + ' mins ' + seconds + ' secs';
        if (seconds == 60) {
            minute++;
            seconds = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
    deck.removeEventListener('click', startTimer);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;

    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;

        
        // do cards match?
        console.log(firstCard.dataset.framework);
        console.log(secondCard.dataset.framework);

        checkForMatch();

    }
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        // it's a match!
        disableCards();
        countMoves();
    } else {
        // not a match
        unflipCards();
        countMoves();
        // Ternary Operation
        // let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

        // isMatch ? disableCards() : unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
        setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
        }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();


deck.addEventListener('click', startTimer);

cards.forEach(card => card.addEventListener('click', flipCard))

resetButton.addEventListener('click', newGame)
