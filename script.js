const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const container = document.querySelector('.container');

let isJumping = false;
let isGameOver = false;
let position = 0;
let score = 0;
var scoreElement;
var myMusic;
var myPonts;
var myGameOver;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "auto");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
} 

myMusic = new sound("Main_Theme.mp3");
myGameOver = new sound("Game_Over.mp3");
myPonts = new sound("Nintendo_Logo.mp3");
myMusic.play();

function drawScore() {  
  if(score <= 1){    
    scoreElement = document.createElement('h2');
    scoreElement.classList.add('score');
    scoreElement.textContent = "Pontuação: "+score;
    container.appendChild(scoreElement);
    myPonts.play();    
  }
  else{
    scoreElement.textContent = "Pontuação: "+score;
    container.appendChild(scoreElement);
    myPonts.play();
  }
}

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();      
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 200) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 10);
    } else {
      // Subindo
      position += 10;
      dino.style.bottom = position + 'px';
    }
  }, 10);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 5000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
      score++;
      drawScore();
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      myMusic.stop();      
      document.body.innerHTML = '<h1 class="game-over"> <<< Fim de jogo >>>> </h1>';
      myGameOver.play();
    } else {
      cactusPosition -= 20;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 40);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);