const cards = document.querySelectorAll('.card-container');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

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
    } else {
        // not a match
        unflipCards();

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

cards.forEach(card => card.addEventListener('click', flipCard))