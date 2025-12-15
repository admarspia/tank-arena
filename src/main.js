import './css/style.css';
import Game from './js/engine/Game.js';
//instantiate 
window.bgTracks = {
    level1: new Audio("audio1/Wellerman_Nathan_Evans.mp3"),
    level2: new Audio("audio%20file/Shingeki no Kyojin 2 Opening - Shinzou wo Sasageyo_default.mp3"),
    level3: new Audio("audio%20file/final-boss-music.mp3")
};

Object.values(window.bgTracks).forEach(track => {
    track.loop = true;
    track.volume = 0.5;
    track.muted = true;
});
//start when page loaded(muted)
window.bgTracks.level1.play().catch(() => {});
//unmute on first interaction
document.addEventListener("click", () => {
    Object.values(window.bgTracks).forEach(track => track.muted = false);
}, { once: true });
//dropdown button
const toggleBtn = document.getElementById("music-toggle");
const dropdown = document.getElementById("music-dropdown");

toggleBtn.onclick = () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
};

dropdown.querySelectorAll("button").forEach(btn => {
  btn.onclick = () => {
    const track = btn.dataset.track;

    Object.values(window.bgTracks).forEach(t => {
      t.pause();
      t.currentTime = 0;
    });

    if (track !== "mute") {
      window.bgTracks[track].play();
    }

    dropdown.style.display = "none";
  };
});

document.addEventListener("DOMContentLoaded", () => {
    const tankColors = [
        { color: 0x556B2F, roughness: 0.7, metalness: 0.2 },
        { color: 0x6B8E23, roughness: 0.65, metalness: 0.25 }, 
        { color: 0x8FBC8F, roughness: 0.6, metalness: 0.3 }
    ];

    const fenceColors = [
        { color: 0x444444, roughness: 0.6, metalness: 0.1 }, 
        { color: 0x696686, roughness: 0.55, metalness: 0.15 },
        { color: 0x889988, roughness: 0.5, metalness: 0.2 }    
    ];



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
            controlsPage.style.display = "none";
            gameArea.style.display = "block";


            gameArea.style.width = window.innerWidth + "px";
            gameArea.style.height = window.innerHeight + "px";


            console.log("Load map for Level", index + 1);
            const game = new Game(4 + index, 15 / (index + 1), 50 / (index + 1), tankColors[index], fenceColors[index]);  
            game.start();                        
            console.log("Game Started!");

        });
    });

});
