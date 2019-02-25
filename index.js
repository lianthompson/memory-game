const cards = document.querySelectorAll('.card-container');

let hasFlippedCard = false;
let firstCard, secondCard;
let matchingCards = 0;
let lockBoard = false;
let counter = document.querySelector('.move-counter');
let moves = 0;
let resetButton = document.querySelector('.reset-button');
let timer = document.querySelector('.timer');
let interval;
let deck = document.querySelector('.deck');
let minute = 0;
let seconds = 0;
let stars = document.querySelectorAll('.star');
console.log(stars)
let starsArray = Array.from(stars);
console.log(starsArray)

function newGame() {
    location.reload();
}

function countMoves() {
    moves ++;
    counter.innerHTML = "Moves: " + moves;

    if(moves === 9) {
        starsArray[3].style.display = "none"
        starsArray.pop();
    } else if (moves === 14) {
        starsArray[2].style.display = "none"
        starsArray.pop();
    } else if (moves === 21) {
        starsArray[1].style.display = "none"
        starsArray.pop();
    } else {
        starsArray[0].style.display = "inline"
    }
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
        // console.log(firstCard.dataset.framework);
        // console.log(secondCard.dataset.framework);

        checkForMatch();

    }
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        matchingCards++;
        console.log(matchingCards)
        if(matchingCards == 8) {
            alert("Congrats!! You made " + moves + " moves in " +  minute + " minutes and " + seconds + " seconds. You scored " + starsArray.length + " stars!" );
        }
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


function finished() {
    if(matchingCards === 1) {
        console.log("congrats!")
    }
}

deck.addEventListener('click', startTimer);

cards.forEach(card => card.addEventListener('click', flipCard))

resetButton.addEventListener('click', newGame)
