import './css/style.css';
import Game from './js/engine/Game.js';

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const controlsPage = document.getElementById("controls-page");
    const gameArea = document.getElementById("gameArea");

    const playBtn = document.getElementById("play-btn");

    // Top-right menu
    const btnStart = document.getElementById("menu-start");
    const btnHelp = document.getElementById("menu-help");
    const btnExit = document.getElementById("menu-exit");

    // Help overlay
    const helpOverlay = document.getElementById("help-overlay");
    const closeHelp = document.getElementById("close-help");

    // Level cards
    const levelCards = document.querySelectorAll(".level-card");


    /* ----------------------
       SCREEN NAVIGATION
    ---------------------- */

    // PLAY NOW → Controls Page
    playBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        controlsPage.style.display = "flex";
    });

    // EXIT → Back to Start Screen
    btnExit.addEventListener("click", () => {
        controlsPage.style.display = "none";
        startScreen.style.display = "flex";
    });

    /* ----------------------
       HELP PANEL
    ---------------------- */

    btnHelp.addEventListener("click", () => {
        helpOverlay.style.display = "flex";
    });

    closeHelp.addEventListener("click", () => {
        helpOverlay.style.display = "none";
    });

    /* ----------------------
       START GAME
    ---------------------- */

    btnStart.addEventListener("click", () => {
        controlsPage.style.display = "none";
        gameArea.style.display = "block";

        // 👉 This is where you actually start your game engine
        console.log("Game Started!");
    });


    /* ----------------------
       LEVEL CARDS
    ---------------------- */

    levelCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            alert(`You selected Level ${index + 1}!`);
            console.log("Load map here!");
        });
    });

});
