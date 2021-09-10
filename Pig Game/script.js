'use strict';
let playing = true;

let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');

let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let currentScore = 0;
score0El.textContent = 0;
score1El.textContent = 0;
let activePlayer = 0;

let diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

let rollbtn = document.querySelector('.btn--roll');
rollbtn.addEventListener('click', () => {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

let score = [0, 0];
let holdbtn = document.querySelector('.btn--hold');

holdbtn.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //player wins finish game
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    //switch player
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
  }
});

let newbtn = document.querySelector('.btn--new');

newbtn.addEventListener('click', () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  activePlayer = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  // document.querySelector(`.player--0`).classList.add('player--winner');
  // document.querySelector(`.player--1`).classList.add('player--winner');
  playing=true;
});
