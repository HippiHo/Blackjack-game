//
// Blackjack
// By Elise Maschke
//

// Card variables:

let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = [
  "Ace",
  "King",
  "Queen",
  "Jack",
  "Ten",
  "Nine",
  "Eight",
  "Seven",
  "Six",
  "Five",
  "Four",
  "Three",
  "Two"
];

// DOM variables:

let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

// Game variables:

let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGameButton.addEventListener("click", function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  showStatus();
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  return `${card.value} of ${card.suit}`;
}

function getNextCard() {
  return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case "Ace":
    return 1;
    case "Ten":
    return 10;
    case "Nine":
    return 9;
    case "Eight":
    return 8;
    case "Seven":
    return 7;
    case "Six":
    return 6;
    case "Five":
    return 5;
    case "Four":
    return 4;
    case "Three":
    return 3;
    case "Two":
    return 2;
    default:
    return 10;
  }
}

function getScore(cardsArray){
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardsArray.length; i++) {
    let card = cardsArray[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScore() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = "Welcome to Blackjack";
    return;
  }

  let dealerCardString = "";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + "\n";
  }

  let playerCardString = "";
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + "\n";
  }

  updateScore();

  textArea.innerText = `Dealer has: 
                        ${dealerCardString}
                        (Score: ${dealerScore})
                        
                        Player has:
                        ${playerCardString}
                        (Score: ${playerScore})`;

  if (gameOver) {
    if (playerWon) {
      textArea.innerText += "YOU WIN!";
    } else {
      textArea.innerText += "DEALER WINS!";
    }

    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
  }
}

console.log("Welcome to Blackjack!");
