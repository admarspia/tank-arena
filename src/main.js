import './css/style.css';
import Game from './js/engine/Game.js';

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const controlsPage = document.getElementById("controls-page");
    const gameArea = document.getElementById("gameArea");

    const playBtn = document.getElementById("play-btn");

    const btnStart = document.getElementById("menu-start");
    const btnHelp = document.getElementById("menu-help");
    const btnExit = document.getElementById("menu-exit");

    const helpOverlay = document.getElementById("help-overlay");
    const closeHelpBtn = document.getElementById("close-help");

    const levelCards = document.querySelectorAll(".level-card");


    playBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        controlsPage.style.display = "flex";
    });

    
    btnExit.addEventListener("click", () => {
        controlsPage.style.display = "none";
        startScreen.style.display = "flex";
    });


    btnHelp.addEventListener("click", () => {
        helpOverlay.style.display = "flex";
    });

    closeHelpBtn.addEventListener("click", () => {
        helpOverlay.style.display = "none";
    });



    btnStart.addEventListener("click", () => {
        controlsPage.style.display = "none";
        gameArea.style.display = "block";

        
        gameArea.style.width = window.innerWidth + "px";
        gameArea.style.height = window.innerHeight + "px";

        
        const game = new Game(gameArea);  
        game.start();                       

        console.log("Game Started!");
    });


    levelCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            alert(`You selected Level ${index + 1}!`);
            console.log("Load map for Level", index + 1);
        });
    });

});
