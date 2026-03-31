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
  currentElement[currentPlayer].textContent = 0;
  playerSection[currentPlayer].classList.remove("player--active");

  currentPlayer = currentPlayer === 0 ? 1 : 0;

  playerSection[currentPlayer].classList.add("player--active");
  currentScore = 0;
};
//* tombol new game diklik
btnNewGame.addEventListener("click", function () {
  confirmModal.classList.remove("hidden");
  overlayConfirm.classList.remove("hidden");
});
