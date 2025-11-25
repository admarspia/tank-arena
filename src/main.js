import '/src/css/style.css';
import Game from './js/engine/Game.js'; // Remove the curly braces { }

const startScreen = document.getElementById('start-screen');
const playBtn = document.getElementById('play-btn');

const game = new Game();

playBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    if (typeof game.start === "function") game.start();
    console.log("Game Started!");
});
