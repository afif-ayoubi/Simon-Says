const colors = ['green', 'red', 'blue', 'yellow'];
const playButton = document.getElementById('play');
const levelDisplay = document.getElementById('level');
const highScoreDisplay = document.getElementById('high-score'); 

let highScore = localStorage.getItem('highScore') || 0; 
highScoreDisplay.textContent = highScore; 

const sounds = {
    green: new Audio('sounds/green.mp3'),
    red: new Audio('sounds/red.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    gameOver: new Audio('sounds/game-over.wav'),
    gameWin: new Audio('sounds/game-win.wav'),
    wrong: new Audio('sounds/wrong.mp3')
};
const tiles = document.querySelectorAll('.tile');
const board = document.querySelector('.board');

let currentPattern = [];
let counter = 0;

function generatePattern(level) {
    const pattern = [];
    for (let i = 0; i < level; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        pattern.push(colors[randomIndex]);
    }
    return pattern;
}

function makeClickable() {
    board.classList.remove('unclickable');
}

function makeUnclickable() {
    board.classList.add('unclickable');
}

function activateTile(color) {
    const tile = document.querySelector(`[data-tile="${color}"]`);
    tile.style.opacity = 1;
    tile.classList.remove('inactive');
}

function deactivateTile(color) {
    const tile = document.querySelector(`[data-tile="${color}"]`);
    tile.style.opacity = '0.5';
}

function playSound(color) {
    const sound = sounds[color];
    sound.currentTime = 0;
    sound.play();
}

function playGameOverSound() {
    sounds.gameOver.currentTime = 0;
    sounds.gameOver.play();
}

function playGameWinSound() {
    sounds.gameWin.currentTime = 0;
    sounds.gameWin.play();
}

function playWrongSound() {
    sounds.wrong.currentTime = 0;
    sounds.wrong.play();
}

function resetGame() {
    currentPattern = [];
    counter = 0;
    levelDisplay.textContent = '0';
    makeUnclickable();
}

function playPattern(pattern) {
    makeUnclickable();
    let index = 0;
    const interval = setInterval(() => {
        if (index < pattern.length) {
            const color = pattern[index];
            makeClickable();
            activateTile(color);
            playSound(color);
            setTimeout(() => deactivateTile(color), 500);
            index++;
        } else {
            clearInterval(interval);
            makeClickable();
        }
    }, 1000);
}

function handleTileClick(color) {
    if (color === currentPattern[counter]) {
        playSound(color);
        activateTile(color);
        setTimeout(() => deactivateTile(color), 500);
        counter++;
        if (counter === currentPattern.length) {
            counter = 0;
            let level = parseInt(levelDisplay.textContent);
            level++;
            levelDisplay.textContent = level;
            if (level > highScore) {
                highScore = level;
                highScoreDisplay.textContent = highScore;
                localStorage.setItem('highScore', highScore);
            }
            if (level === 12) { 
                playGameWinSound(); 
                alert("Congratulations! You've won the game!"); 
                resetGame();
            } else {
                currentPattern.push(colors[Math.floor(Math.random() * colors.length)]);
                playPattern(currentPattern);
            }
        }
    } else {
        playGameOverSound();
        alert("Wrong pattern! Game Over!");
        resetGame();
    }
}


tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        if (!tile.classList.contains('unclickable')) {
            const color = tile.dataset.tile;
            handleTileClick(color);
        }
    });
});

playButton.addEventListener('click', () => {
    resetGame();
    levelDisplay.textContent = '1';
    currentPattern.push(colors[Math.floor(Math.random() * colors.length)]);
    playPattern(currentPattern);
});
