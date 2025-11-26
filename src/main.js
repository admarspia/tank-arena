import '/src/css/style.css';
import Game from './js/engine/Game.js';

const startScreen = document.getElementById('start-screen');
const playBtn = document.getElementById('play-btn');

playBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';

    const game = new Game();

    if (typeof game.start === "function") {
        game.start();
    }

    console.log("Game Started!");
});
