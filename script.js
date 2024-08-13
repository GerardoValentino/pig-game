'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPLayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    current0El.textContent = 0;
    current1El.textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the dice.
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${dice}.png`;

        // 3. Check for rolled 1.
        if (dice !== 1) {
            // Add dice to current score
            //console.log(`ACTIVE PLAYER ==> ${activePlayer}`)
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPLayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        // 1. Add current score to active player's score.
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if(scores[activePlayer] >= 20) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPLayer();
        }
    }
});

btnNew.addEventListener('click', () => {
    playing = true;
    currentScore = 0;

    for(let i = 0; i < scores.length; i++) {
        scores[i] = 0;
    }

    if (activePlayer === 1) {
        document.querySelector('.player--1').classList.remove('player--winner');
        document.querySelector('.player--1').classList.remove('player--active');
    }

    activePlayer = 0;
    player0El.classList.add('player--active');
    diceEl.classList.add('hidden');

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
});