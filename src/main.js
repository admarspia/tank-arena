import Game from './js/engine/Game.js';

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const controlsPage = document.getElementById("controls-page");
    const gameArea = document.getElementById("gameArea");

    const playBtn = document.getElementById("play-btn");
    const controlsPlayBtn = document.getElementById("controls-play-btn");

    // Landing page -> Controls page
    playBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        controlsPage.style.display = "flex";
    });

    // Controls page -> Start game
    controlsPlayBtn.addEventListener("click", () => {
        controlsPage.style.display = "none";

        // Show game area first
        gameArea.style.display = "block";
        gameArea.style.width = window.innerWidth + "px";
        gameArea.style.height = window.innerHeight + "px";

        // Start the game
        const game = new Game();
        game.start();

        console.log("Game Started!");
    });
});
