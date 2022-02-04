const choices = document.querySelectorAll('.choices');
const scoreBoard = document.querySelectorAll('.score-board h2');
let questionMark1 = document.querySelector('.question-mark1 ');
const questionMark2= document.querySelector('.question-mark2 ');
const content = document.querySelector('.content ');
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const restart = document.querySelector('button')


let playerScore = 0;
let computerScore = 0;

      
choices.forEach(choice => {choice.addEventListener('click',e => {
  playerWeapon = e.target.id;
  playeGame(playerWeapon)
})})

//  ---------------start game ---------------
function playeGame(playerWeapon) {
  computerWeapon = computerPlay();
 const winner =  checkWinner(computerWeapon,playerWeapon);
  updateUI(winner,computerWeapon,playerWeapon);
}



// -------------computer choice -------------------
function computerPlay() {
  const weapons = ['rock','paper','scissor']
  return  weapons[Math.floor(Math.random() * 3)];
}



// ----------------check winner -----------------
function checkWinner(computerWeapon,playerWeapon) {
      if(computerWeapon === playerWeapon) {
        return [`It's  a tie`,`Same weapon chosen by computer`];
      }
      if(
        playerWeapon === 'rock' && computerWeapon === 'scissor' ||
        playerWeapon === 'scissor' && computerWeapon === 'paper' ||
        playerWeapon === 'paper' && computerWeapon === 'rock' 
      )
       {
         playerScore++
        return [`You Won!`,`${playerWeapon[0].toUpperCase() + playerWeapon.slice(1)} beats ${computerWeapon[0].toUpperCase() + computerWeapon.slice(1)}`]
       } else {
         computerScore++
        return [`You Lost!`,`${playerWeapon[0].toUpperCase() + playerWeapon.slice(1)} beaten by ${computerWeapon[0].toUpperCase() + computerWeapon.slice(1)}`]
       }
    
  }


  const choiceImages = {
    'rock': '👊',
    'paper': '✋',
    'scissor': '✌️',
  }


  function updateUI(winner,computerWeapon,playerWeapon) {
     content.firstElementChild.textContent = winner[0];
     content.lastElementChild.textContent = winner[1];
     scoreBoard[0].textContent = `Player: ${playerScore}`
     scoreBoard[1].textContent = `Computer: ${computerScore}`


     questionMark1.classList.remove('fas','fa-question')
     questionMark2.classList.remove('fas','fa-question')
     questionMark1.textContent = choiceImages[playerWeapon]
     questionMark2.textContent = choiceImages[computerWeapon]
     if(playerScore === 5 || computerScore === 5) {
       showModal();
     }
  }

// ---------------------show modal ------------------------------
function showModal(winner) {
     modal.style.display = 'flex';
    let result = (playerScore ===5)?'You Won!':'You Lost!';
    modalContent.firstElementChild.textContent = result;
}

// ----------------------Restart game ----------------------------
restart.addEventListener('click',() => {
    modal.style.display = 'none';
    playerScore = 0;
    computerScore = 0;
    content.firstElementChild.textContent = `Choose Your Weapon`;
    content.lastElementChild.textContent = `First to score 5 points wins the game` ;
    scoreBoard[0].textContent = `Player: ${playerScore}`
    scoreBoard[1].textContent = `Computer: ${computerScore}`

    questionMark1.classList.add('fas','fa-question')
    questionMark2.classList.add('fas','fa-question')
    questionMark1.textContent = ''
    questionMark2.textContent = ''
})