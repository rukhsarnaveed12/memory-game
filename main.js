const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

// Shuffle the card values
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create cards and add them to the board
function createCards() {
    const shuffledValues = shuffle([...cardValues]);
    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

// Flip the card
function flipCard() {
    if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-value');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

// Check for a match
function checkForMatch() {
    if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs += 1;
        message.textContent = 'Good job!';

        resetBoard();
    } else {
        message.textContent = 'Try again!';
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

// Reset the board
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;

    // Check if all pairs are matched
    if (matchedPairs === cardValues.length / 2) {
        message.textContent = 'Congratulations! You found all pairs!';
    }
}

// Restart the game
function restartGame() {
    cards = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    message.textContent = '';
    gameBoard.innerHTML = ''; // Clear the board
    createCards(); // Create new cards
}

// Event listener for the restart button
restartButton.addEventListener('click', restartGame);

// Initialize the game
createCards();