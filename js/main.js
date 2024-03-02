const colors = ['green', 'red', 'blue', 'yellow'];
const sounds = {
    green: new Audio('sounds/green.mp3'),
    red: new Audio('sounds/red.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    gameOver: new Audio('sounds/game-over.wav'),
    gameWin: new Audio('sounds/game-win.wav'),
    wrong: new Audio('sounds/wrong.mp3')
};

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
