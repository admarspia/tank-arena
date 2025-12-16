import Renderer from "./Renderer.js";
import Input from "./Input.js";
import ThirdPersonCamera from "./Camera.js";
import PlayerTank from "../entities/PlayerTank.js";
import Fance from "../entities/Fance.js";
import CollisionHandler from "../utils/CollisionHandler.js";
import GameLogic from "./GameLogic.js";

export default class Game {
    // store level number
    constructor(levels = 1, ...rest) {
    this.levels = levels;
}

    constructor(levels, gameDuration, shrinkSpeed, tankColor, fenceColor ) {

        this.renderer = new Renderer();
        this.input = new Input();
        this.gameLogic = new GameLogic();
        this.tankColor = tankColor;
        this.fenceColor = fenceColor;

        this.playerTank = null;
        this.cameraController = null;
        this.collisionHandler = null;

        this.fences = [];
        this.activeFence = null;
        this.hiddenWallIndex = 1;
        this.levels = levels;

        this.lastTime = 0;
        this.isRunning = false;
        this.isPaused = false;

        this.gameDuration = gameDuration * 10000;
        this.shrinkSpeed = shrinkSpeed * 1000;
        this.timer = null;
        this.shrinkTimeout = null;

        this.container = document.getElementById("gameArea");

        this.messageBox = document.createElement("div");
        Object.assign(this.messageBox.style, {
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "42px",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "20px 40px",
            borderRadius: "10px",
            display: "none"
        });
        this.container.appendChild(this.messageBox);

        this.phraseBox = document.createElement("div");
        Object.assign(this.phraseBox.style, {
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "32px",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px 20px",
            borderRadius: "10px",
            display: "none"
        });
        this.container.appendChild(this.phraseBox);
    }

    start() {
        this.createFences();
        this.createPlayer();
        this.setupCamera();
        this.setupCollisionHandler();

        this.activeFence.isActive = true;
        this.isRunning = true;
        //background start
        this.playBackgroundMusic(1);

        this.timer = setTimeout(() => this.endGame("Time's up! You lose!"), this.gameDuration);

        this.shrinkFenceRecursively();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    pause() {
        if (!this.isRunning || this.isPaused) return;
        this.isPaused = true;
        clearTimeout(this.timer);
        clearTimeout(this.shrinkTimeout);
    }

    resume() {
        if (!this.isRunning || !this.isPaused) return;
        this.isPaused = false;

        // resume timers
        this.shrinkFenceRecursively();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        clearTimeout(this.timer);
        clearTimeout(this.shrinkTimeout);
        console.log("Game stopped");
    }

    endGame(message) {
        this.stop();
        // auto switch
        if (window.bgTracks) {

        Object.values(window.bgTracks).forEach(track => {
            track.pause();
            track.currentTime = 0;
        });

        //deleted switch

        this.messageBox.textContent = message;
        this.messageBox.style.display = "block";
    }

       createFences() {
        for (let i = 0; i < this.levels; i++) {
            const base = 12 + i * 10;
            let fence = new Fance(this.renderer, i + 1, base, base,2, this.fenceColor);
            fence.createFance();
            fence.isActive = false;
            this.fences.push(fence);
        }

        for (let i = 0; i < this.levels - 1; i++) {
            this.fences[i].nextLevel = this.fences[i + 1];
        }
        this.fences[this.levels - 1].nextLevel = null;

        this.activeFence = this.fences[0];
    }

    createPlayer() {
        this.playerTank = new PlayerTank("Player1", 1, this.renderer.scene, 0, 0.5, 0, this.tankColor);
        this.renderer.scene.add(this.playerTank.mesh);
    }

    setupCamera() {
        this.cameraController = new ThirdPersonCamera(
            this.renderer.camera,
            this.playerTank,
            { distance: 10, height: 10 }
        );
    }

    setupCollisionHandler() {
        this.collisionHandler = new CollisionHandler(
            this,
            this.activeFence,
            this.activeFence.walls,
            this.playerTank.bullets,
            this.playerTank,
            this.hiddenWallIndex
        );
    }

     generateNewPuzzle() {

        const phrase = this.gameLogic.pickPhrase();
        this.hiddenWallIndex = this.gameLogic.getIndex(this.activeFence.walls.length);

        this.phraseBox.textContent = phrase + " "+  this.hiddenWallIndex;
        this.phraseBox.style.display = "block";

        this.collisionHandler.hiddenWallIndex = this.hiddenWallIndex;
    }


    shrinkFenceRecursively() {
        if (!this.isRunning || this.isPaused) return;
        if (!this.activeFence.isActive) return;

        this.generateNewPuzzle();
        this.activeFence.shrink();
        this.collisionHandler.setFence(this.activeFence);

        if (this.activeFence.width > 4) {
            this.shrinkTimeout = setTimeout(() => {
                this.shrinkFenceRecursively();
            },this.shrinkSpeed);
        }
    }

    gameLoop(time) {
        if (!this.isRunning) return;
        if (this.isPaused) return;

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.input.handleUserInputs(delta, this.playerTank, this.renderer, this);

        if (!this.playerTank.isAlive) {
            this.endGame("Tank destroyed! You lose!");
            return;
        }

        const lastFence = this.fences[this.fences.length - 1];
        if (lastFence.destroyed === true) {
            this.endGame("You win! Last fence destroyed!");
            return;
        }

        if (!this.activeFence.isActive && this.activeFence.nextLevel) {
            this.activeFence = this.activeFence.nextLevel;
            this.activeFence.isActive = true;
            this.collisionHandler.setFence(this.activeFence);
           //switch bg
            const currentLevel = this.fences.indexOf(this.activeFence) + 1;
            this.playBackgroundMusic(currentLevel);

            this.generateNewPuzzle();
            this.shrinkFenceRecursively();
        }

        this.collisionHandler.update();
        this.playerTank.updateBullets(delta);
        this.cameraController.update(delta);
        this.renderer.render();

        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

