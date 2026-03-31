/*
    1. Tuliskan seluruh kode Java Script Anda di sini
    2. Semua file di project ini TIDAK PERLU diubah, selain file ini
    3. Pastikan program anda rapi, terstruktur dengan baik, dan mudah dibaca
*/

//? tarik elemen HTML yang dibutuhkan
const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceImage = document.querySelector(".dice");
const confirmModal = document.querySelector("#confirm-modal");
const overlayConfirm = document.querySelector("#overlay-confirm");
const turnIndicator = document.querySelector(".btn--turn-indicator");

const scoreElement = [
  document.querySelector("#score--0"),
  document.querySelector("#score--1"),
];

const currentScoreElement = [
  document.querySelector("#current--0"),
  document.querySelector("#current--1"),
];

const playerElement = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];

//* Limit Skor
const scoreLimit = 10;

let scores, currentScore, activePlayer, isGameActive;

//* Switch Player Function
const switchPlayer = function () {
  currentScoreElement[activePlayer].textContent = 0;
  playerElement[activePlayer].classList.remove("player--active");

  activePlayer = activePlayer === 0 ? 1 : 0;

  playerElement[activePlayer].classList.add("player--active");
  currentScore = 0;

  turnIndicator.value = `Giliran: Player ${activePlayer + 1}`;
};

//* tombol new game diklik
btnNewGame.addEventListener("click", function () {
  confirmModal.classList.remove("hidden");
  overlayConfirm.classList.remove("hidden");
});

//* new game button function
const initializeGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameActive = true;

  diceImage.classList.add('hidden');
  turnIndicator.value = "Turn: Player 1";

  for (let i = 0; i < 2; i++) {
  scoreElement[i].textContent = 0;        // ← ini juga perlu!
  currentScoreElement[i].textContent = 0;
  playerElement[i].classList.remove('player--active');
  playerElement[i].classList.remove('player--winner');
}

  playerElement[0].classList.add('player--active');
};

//* roll dice button function
const rollDiceClicked = function () {
  if (!isGameActive) return;

  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  diceImage.src = `assets/dice-${diceNumber}.png`;
  diceImage.classList.remove('hidden');

  if (diceNumber === 1) {
    switchPlayer();
  } else {
    currentScore += diceNumber;
    currentScoreElement[activePlayer].textContent = currentScore;
  }
};

//* hold button function
const holdClicked = function () {
  if (!isGameActive) return;

  scores[activePlayer] += currentScore;
  scoreElement[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= scoreLimit) {
    declarePlayerWinner(activePlayer);
  } else {
    switchPlayer();
  }
};

//* declare winner function
const declarePlayerWinner = function (player) {
  isGameActive = false;
  
  // tampilkan modal
  const modal = document.querySelector('#winner-modal');
  const overlay = document.querySelector('#overlay');
  const winnerText = document.querySelector('#winner-text');
  
  winnerText.textContent = `Player ${player + 1} Wins! 🎉`;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// tutup confirm modal
const closeConfirmModal = function () {
  confirmModal.classList.add('hidden');
  overlayConfirm.classList.add('hidden');
};


//* event listeners
btnRollDice.addEventListener('click', rollDiceClicked);
btnHold.addEventListener('click', holdClicked);
document.querySelector('.btn--close-modal').addEventListener('click', function() {
  document.querySelector('#winner-modal').classList.add('hidden');
  document.querySelector('#overlay').classList.add('hidden');
  initializeGame();
});
document.querySelector('#overlay').addEventListener('click', function() {
  document.querySelector('#winner-modal').classList.add('hidden');
  document.querySelector('#overlay').classList.add('hidden');
  initializeGame();
});

document.querySelector('.btn--confirm-yes').addEventListener('click', function () {
  closeConfirmModal();
  // tutup winner modal juga kalau sedang terbuka
  document.querySelector('#winner-modal').classList.add('hidden');
  document.querySelector('#overlay').classList.add('hidden');
  initializeGame();
});

document.querySelector('.btn--confirm-no').addEventListener('click', closeConfirmModal);
overlayConfirm.addEventListener('click', closeConfirmModal);
// mulai game
initializeGame();


