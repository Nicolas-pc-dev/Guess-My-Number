'use strict';
const body = document.querySelector('body');
const header = document.querySelector('header');
const title = document.querySelector('h1');
const gnrContainer = document.querySelector('.container');
const numberContainer = document.querySelector('.number-container');
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
const btnSwitch = document.querySelector('#switch');

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
  switchStyle(body, 'background', '#b60505');
  setTimeout(() => {
    if (body.classList.contains('light')) {
      switchStyle(body, 'background', '#fff');
    } else {
      switchStyle(body, 'background', '#000');
    }
  }, 450);
};

const loseDisplay = function () {
  switchStyle(body, 'background', '#b60505');
  switchStyle(body, 'color', '#fff');
  switchStyle(header, 'border-bottom', '7px solid #fff');
  switchStyle(guessNumber, 'border', '4px solid #fff');
  switchStyle(number, '#eee', '#000');
  switchStyle(checkBtn, '#eee', '#000');
};

const switchStyle = function (element, fValue, sValue) {
  element.className === number.className ||
  element.className === checkBtn.className
    ? element.style.setProperty(`background`, fValue) ||
      element.style.setProperty('color', sValue)
    : element.style.setProperty(fValue, sValue);
};

const lightTheme = function () {
  switchStyle(body, 'background', '#fff');
  switchStyle(body, 'color', '#000');
  switchStyle(header, 'border-bottom', '7px solid #000');
  switchStyle(guessNumber, 'border', '4px solid #000');
  switchStyle(number, '#000', '#fff');
  switchStyle(checkBtn, '#000', '#fff');
};

const darkTheme = function () {
  switchStyle(body, 'background', '#000');
  switchStyle(body, 'color', '#fff');
  switchStyle(header, 'border-bottom', '7px solid #fff');
  switchStyle(guessNumber, 'border', '4px solid #fff');
  switchStyle(number, '#fff', '#000');
  switchStyle(checkBtn, '#fff', '#000');
};

let secretNumber = getSecretNumber();
let score = 20;
let highScore = 0;
let themeState = darkTheme();

btnSwitch.addEventListener('click', function () {
  btnSwitch.classList.toggle('active');
  body.classList.toggle('light');
  body.classList.contains('light') ? lightTheme() : darkTheme();
});

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
      toggleBtn();
    }
  } else {
    themeState = loseDisplay();
    btnSwitch.addEventListener('click', () => loseDisplay());
    title.textContent = '¡ You Lost the Game !';
    displayMessage('💥 💥 💥 💥 💥');
    guessNumber.setAttribute('disabled', '""');
    guessNumber.value = '';
    numberContainer.textContent = '💀';
    toggleBtn();
  }
});

resetBtn.addEventListener('click', function () {
  body.classList.toggle('redBg');
  if (body.classList.contains('light')) {
    console.log('Hello');
    lightTheme();
  } else {
    darkTheme();
  }
  number.textContent = '?';
  guessNumber.value = '';
  guessNumber.removeAttribute('disabled');
  title.textContent = 'Guess My Number!';
  score = 20;
  scoreContent.textContent = '20';
  number.style.width = '15rem';
  displayMessage('Start guessing ...');
  secretNumber = getSecretNumber();
  toggleBtn();
});
