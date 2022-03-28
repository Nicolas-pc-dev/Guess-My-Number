'use strict';
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const scoreContent = document.querySelector('.score');
const checkBtn = document.querySelector('.check');
const body = document.querySelector('body');
const resetBtn = document.querySelector('.again');
const guessNumber = document.querySelector('.guess');
const highScoreContent = document.querySelector('.high-score');

const getSecretNumber = () => Math.trunc(Math.random() * 20) + 1;

const subtractScore = function () {
  score--;
  return (scoreContent.textContent = score);
};

const displayMessage = text => (message.textContent = text);

const resetGame = function () {
  body.style.backgroundColor = '#222';
  number.style.width = '15rem';
  guessNumber.value = '';
  number.textContent = '?';
  score = 20;
  scoreContent.textContent = score;
  secretNumber = getSecretNumber();
  displayMessage('Start guessing...');
};

const setHighScore = function (score) {
  score > highScore ? (highScore = score) : null;
  return (highScoreContent.textContent = highScore);
};

const renderWinDisplay = function () {
  number.textContent = secretNumber;
  body.style.backgroundColor = '#60b347';
  number.style.width = '30rem';
};

let secretNumber = getSecretNumber();
let score = 20;
let highScore = 0;

checkBtn.addEventListener('click', function () {
  const guess = Number(guessNumber.value);

  if (!guess) {
    return displayMessage('⚠️ Type a Number');
  }

  if (score > 1) {
    if (guess !== secretNumber) {
      displayMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
      subtractScore();
    }

    //INPUT MATCH WITH THE SECRET NUMBER => Win the game !
    if (guess === secretNumber) {
      displayMessage('✔️ Correct Number');
      renderWinDisplay();
      setHighScore(score);
    }
  } else {
    displayMessage('💥¡ You Lost the Game !');
    scoreContent.textContent = 0;
  }
});

resetBtn.addEventListener('click', resetGame);
