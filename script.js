"use strict";
// selectiong elements + lets
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // ids
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");

const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");

// const score = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;
let score, currentScore, activePlayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // if the active player is 0, reassign it(result of that) to 1, if that is false stay 0
  player0El.classList.toggle("player--active"); //adding changing backround while players change
  player1El.classList.toggle("player--active");
};

// rolling dice functionality

buttonRoll.addEventListener("click", function () {
  if (playing) {
    // 1.Generationg random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.Diplay dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3.Check for roller 1, if true, switch to next player
    if (dice !== 1) {
      currentScore += dice; // je jako currentscore = currentscore+dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0EL.textContent = currentScore; // change later
    } else {
      // switch the next player
      switchPlayer();
    }
  }
});
buttonHold.addEventListener("click", function () {
  if (playing) {
    // Add current scroe to active's  player score
    score[activePlayer] += currentScore; // scores[1]= scores[1]+currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check score is already at least 100, //if so, finish the game, if not than
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
buttonNew.addEventListener("click", init);
