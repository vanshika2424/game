let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;

// Shuffle the cards
function shuffle() {
  cardArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomIndex;
    card.children[1].style.backgroundImage = `url(${card.getAttribute('data-image')})`;
  });
}

// Flip a card
function flipCard() {
  if (lockCard) return;  // If cards are locked, ignore clicks
  if (this === firstCard) return; // Prevent double click on the same card

  this.classList.add("flip");  // Add a CSS class to flip the card

  if (!flippedCard) {
    // First card is flipped
    flippedCard = true;
    firstCard = this;
    return;
  }

  // Second card is flipped
  flippedCard = false;
  secondCard = this;

  checkForMatch();
}

// Check if two cards match
function checkForMatch() {
  if (firstCard.getAttribute("data-image") === secondCard.getAttribute("data-image")) {
    // It's a match!
    disableCards();
  } else {
    // Not a match, unflip the cards
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip non-matched cards
function unflipCards() {
  lockCard = true;  // Lock the board so no other cards can be flipped

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Reset the game board for the next turn
function resetBoard() {
  [flippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Start the game
function startGame() {
  shuffle();
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

// Start the game when the DOM is fully loaded
window.onload = startGame;
