// 1. Create and assign variables and retrieve the necessary HTML elements
/* eslint-disable */
var record = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var imgRec = [];
var images;
// var status;
var rand;
var flipIndex = 0;
var cardTextRec = [];
var cardRec = [];
var cardNum;
var front;
var back;
var cardChk = 0;
var correct = 0;

var memory = document.getElementById('game');
var timer = document.getElementById('timer');
var scoreEl = document.getElementById('score');
var newGame;
var result = document.getElementById('result');
var opacityD = document.getElementById('opacityD');
var h1Res = document.getElementById('h1Res');
var pRes = document.getElementById('pRes');

var status = 0;
var countDown;
var secsInput = 60;
var seconds = secsInput;
var gameOver = false;

// 2. Make the flipping work

memory.addEventListener('click', function(e) {
  var el = e.target.parentElement;
  var numId = el.id;
  if (Number.isInteger(parseInt(numId.replace('back', ''), 10))) {
    cardClick(el.parentElement.id);
  } else {
    cardClick(numId);
  }
});

function cardClick(cardId) {
  cardNum = cardId.replace('card', '');
  cardNum = parseInt(cardNum, 10);

  if (record[cardNum - 1] == 0 && cardChk == 0 && gameOver == false) {
    front = document.getElementById('front' + cardNum);

    back = document.getElementById('back' + cardNum);

    front.style.transform = 'rotateY(-180deg)';
    back.style.transform = 'rotateY(0deg)';

    // 3. Basic game -- no randomization, no timer, just flipping, comparing and alert box for result
    cardTextRec.push(back.innerHTML);
    cardRec.push(cardNum);

    flipIndex++;
    // record(cardNum-1) = 1
    record[cardNum - 1] = 1;

    if (flipIndex == 2) {
      if (cardTextRec[0] == cardTextRec[1]) {
        correct++;
        scoreEl.innerHTML = 'Score: ' + correct;
        cardRec = [];
        cardTextRec = [];
        flipIndex = 0;

        if (correct == 10) {
          clearTimeout(countDown);
          setTimeout(function() {
            displayResult();
          }, 600);
        }
        return;
      } else {
        cardChk = 1;
        setTimeout(function() {
          flipBack();
        }, 600);
        return;
      }
    }
  }
  if (gameOver == true) {
    alert('Game is over. Click on the New Game button to start a new game');
  }
}

function flipBack() {
  front = document.getElementById('front' + cardRec[0]);
  back = document.getElementById('back' + cardRec[0]);
  front.style.transform = 'rotateY(0deg)';
  back.style.transform = 'rotateY(180deg)';

  front = document.getElementById('front' + cardRec[1]);
  back = document.getElementById('back' + cardRec[1]);
  front.style.transform = 'rotateY(0deg)';
  back.style.transform = 'rotateY(180deg)';

  record[cardRec[0] - 1] = 0;
  record[cardRec[1] - 1] = 0;
  cardTextRec = [];
  cardRec = [];
  flipIndex = 0;
  cardChk = 0;
}

function displayResult() {
  gameOver = true;
  if (correct == 10) {
    alert('Congrats, you won. Your score is ' + correct);
  } else {
    alert('Your score is ' + correct);
  }
}

// 4. Make new game button work

newGame = document.getElementById('new');
newGame.addEventListener('click', newClick);

function newClick() {
  window.location.reload();
}

// 5. Randomize the game boxes on loading - also create images.js file here

function newBoard() {
  for (var i = 0; i < 20; i++) {
    if (i == 0) {
      rand = Math.round(Math.random() * images.length);
      while (rand === images.length) {
        rand = Math.round(Math.random() * images.length);
      }
      imgRec[i] = rand;
    } else {
      while (status == 0) {
        rand = Math.round(Math.random() * images.length);
        if (rand !== images.length) {
          for (var j = 0; j < imgRec.length; j++) {
            if (rand == imgRec[j]) {
              break;
            } else if (j == imgRec.length - 1) {
              status = 1;
              imgRec[i] = rand;
            }
          }
        }
      }
    }
    status = 0;
    document.getElementById('back' + (i + 1)).innerHTML = images[rand];
  }
  startTimer(seconds);
}

// 6. Create timer
function startTimer(secs) {
  timer.innerHTML = '00:' + secs;
  if (secs == 0) {
    clearTimeout(countDown);
    setTimeout(function() {
      displayResult();
    }, 800);
    timer.innerHTML = '00:00';
    return;
  }
  secs--;
  countDown = setTimeout(function() {
    startTimer(secs);
  }, 1000);
}
// 7. Make the fancy display for results

window.onload = newBoard();
