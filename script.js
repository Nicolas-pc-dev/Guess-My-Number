'use strict';
const body = document.querySelector('body');
const title = document.querySelector('h1');
const gnrContainer = document.querySelector('.container');
const leftContainer = document.querySelector('.left');
const rightContainer = document.querySelector('.right');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const scoreContent = document.querySelector('.score');
const checkBtn = document.querySelector('.check');
const resetBtn = document.querySelector('.reset');
const guessNumber = document.querySelector('.guess');
const highScoreContent = document.querySelector('.high-score');
const labelScore = document.querySelector('.label-score');

const getSecretNumber = () => Math.trunc(Math.random() * 20) + 1;

const subtractScore = function () {
  score--;
  return (scoreContent.textContent = score);
};

const displayMessage = text => (message.textContent = text);

const toggleBtn = function () {
  resetBtn.classList.toggle('again');
  checkBtn.classList.toggle('again');
};

const resetGame = function () {
  title.textContent = 'Guess My Number!';
  guessNumber.classList.remove('again');
  labelScore.classList.remove('again');
  message.classList.remove('again');
  body.classList.toggle('redBg');
  labelScore.classList.remove('again');
  number.style.width = '15rem';
  guessNumber.value = '';
  number.textContent = '?';
  score = 20;
  scoreContent.textContent = score;
  secretNumber = getSecretNumber();
  toggleBtn();
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

const bgAlert = function () {
  body.classList.toggle('redBg');
  setTimeout(() => {
    body.classList.toggle('redBg');
  }, 100);
};

const html = `
<div class="lose-message"> 
<button class="btn reset">Try Again!</button>
</div>
`;

let secretNumber = getSecretNumber();
let score = 20;
let highScore = 0;

checkBtn.addEventListener('click', function () {
  const guess = Number(guessNumber.value);

  if (!guess) {
    return displayMessage('⚠️ Type a Number');
  }

  if (guess <= 0 || guess >= 21) {
    return displayMessage('Invalid Number');
  }

  if (score > 1) {
    if (guess !== secretNumber) {
      displayMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
      subtractScore();
      bgAlert();
    }

    //INPUT MATCH WITH THE SECRET NUMBER => Win the game !
    if (guess === secretNumber) {
      displayMessage('✔️ Correct Number');
      renderWinDisplay();
      setHighScore(score);
    }
  } else {
    title.textContent = '💥¡ You Lost the Game !';
    body.classList.toggle('redBg');
    rightContainer.classList.add('again');
    leftContainer.classList.add('again');

    // scoreContent.textContent = 0;
    // guessNumber.classList.add('again');
    // labelScore.classList.add('again');
    // message.classList.add('again');
    gnrContainer.insertAdjacentHTML('afterbegin', html);
    toggleBtn();
  }
});
resetBtn.addEventListener('click', function () {
  console.log(click);
});
