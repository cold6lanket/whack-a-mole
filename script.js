const holes = document.querySelectorAll('.hole'),
      scoreBoard = document.querySelector('.score'),
      moles = document.querySelectorAll('.mole'),
      startBtn = document.getElementById('btn-start');

let lastHole, 
    gameDuration = false, 
    score =0;

startBtn.addEventListener('click', startGame);

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole) {
        return randomHole(holes);
    }

    lastHole = hole;

    return hole;
}

function startGame() {
    score = 0;
    gameDuration = false;
    scoreBoard.textContent = score;
    showMole();

    setTimeout(() => {
        gameDuration = true;
        alert('Finish!');
    }, 10000);
}

function showMole() {
    const chosenHole = randomHole(holes);
    const time = randomTime(50, 2000);
    chosenHole.classList.add('up');
    
    let timer = setTimeout(() => {
        chosenHole.classList.remove('up');
        if (!gameDuration) {
            showMole();
        }
    }, time);

    return timer;
}


function catchMole(e) {
    const caughtMole = e.target;

    caughtMole.parentElement.classList.remove('up');
    score++;
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', catchMole));