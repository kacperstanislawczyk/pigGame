var scores, roundScore, activePlayer, dice1, dice2, isRunning, previousDice1, previousDice2, winningScore;

//add panel that will print messages (if dice1 === 1, dice1 && previous dice1 === 6, etc)

init();

function init() {
  isRunning = true;
  winningScore = document.getElementById('ptsToWin').value;
  console.log(winningScore);
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  document.getElementById('log').innerHTML = '';
  document.getElementById('log').style.display = 'none';


  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('winner');
  document.querySelector('.player--1').classList.remove('winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}

document.querySelector('.btn--new').addEventListener('click', init);


function changePlayer() {
    roundScore = 0;
    previousDice1 = 0;
    previousDice2 = 0;
    document.querySelector('#current--' + activePlayer).textContent = roundScore;
    
    document.querySelector('.player--1').classList.toggle('player--active');
    document.querySelector('.player--0').classList.toggle('player--active');

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

}

function resetActivePlayerScore(){
  scores[activePlayer] = 0;
  document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
  roundScore = 0;
  document.querySelector('#current--' + activePlayer).textContent = roundScore;

}


document.querySelector('.btn--roll').addEventListener('click', function() {
    if (isRunning) {
      dice1 = Math.floor(Math.random() * 6)+1;
      dice2 = Math.floor(Math.random() * 6)+1;

      var diceDOM = document.querySelector('.dice1');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice1 + '.png';

      var dice2DOM = document.querySelector('.dice2');
      dice2DOM.style.display = 'block';
      dice2DOM.src = 'dice-' + dice2 + '.png';

      logRoll();

      if (previousDice1 === 6 && dice1 === 6) {
        resetActivePlayerScore();
        changePlayer();
      } else if (previousDice2 === 6 && dice2 === 6) {
        resetActivePlayerScore();
        changePlayer();
      } 
      else if (dice1 !== 1 && dice2 !== 1) {
        previousDice1 = dice1;
        previousDice2 = dice2;

        roundScore += dice1;
        roundScore += dice2;

        document.querySelector('#current--' + activePlayer).textContent = roundScore;
      } else {
        changePlayer();
      }
    }
  }
);

document.querySelector('.btn--hold').addEventListener('click', function() {  
  if (isRunning) {
    scores[activePlayer] += roundScore;
    document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
    document.getElementById('log').innerHTML = '';
    if (scores[0]>=winningScore || scores[1]>=winningScore) {
        roundScore = 0;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice1').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player--' + activePlayer).classList.add('winner');
        document.querySelector('.player--' + activePlayer).classList.remove('active');
        isRunning = false;
      } else {
      changePlayer();
    }
  }
});

function logRoll() {
  document.getElementById('log').style.display = 'block';
  if(dice1===1 || dice2 ===1) {
    activePlayer === 0? document.getElementById('log').innerHTML = 'You rolled 1. Now it\'s Player 2 turn.' 
    : document.getElementById('log').innerHTML = 'You rolled 1. Now it\'s Player 1 turn.';
  } else if(previousDice1 === 6 && dice1 === 6) {
    activePlayer === 0? document.getElementById('log').innerHTML = 'You rolled 6 two times in a row with dice 1 - you lose your score. Now it\'s Player 2 turn.' 
    : document.getElementById('log').innerHTML = 'You rolled 6 two times in a row with dice 1. Now it\'s Player 1 turn.';
  } else if(previousDice2 === 6 && dice2 === 6) {
    activePlayer === 0? document.getElementById('log').innerHTML = 'You rolled 6 two times in a row with dice 2 - you lose your score. Now it\'s Player 2 turn.'
    : document.getElementById('log').innerHTML = 'You rolled 6 two times in a row with dice 2. Now it\'s Player 1 turn.';
  } else {
    document.getElementById('log').innerHTML = '';
    document.getElementById('log').style.display = 'none';

  }
}




