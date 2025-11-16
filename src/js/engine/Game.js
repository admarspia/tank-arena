import Renderer from "./Renderer.js";
import Input from "./Input.js";
import ThirdPersonCamera from "./Camera.js";
import PlayerTank from "../entities/PlayerTank.js";
import Fance from "../entities/Fance.js";
import CollisionHandler from "../utils/CollisionHandler.js";
import GameLogic from "./GameLogic.js";

export default class Game {
    constructor() {
        this.renderer = new Renderer();
        this.input = new Input();
        this.gameLogic = new GameLogic();

        this.playerTank = null;
        this.cameraController = null;
        this.collisionHandler = null;

        this.fences = [];
        this.activeFence = null;
        this.hiddenWallIndex = 3;
        this.levels = 3;

        this.lastTime = 0;
        this.isRunning = false;
        this.gameDuration = 5 * 60 * 1000; 
        this.timer = null;

        this.container = document.getElementById("gameArea");
        this.messageBox = document.createElement("div");

        Object.assign(this.messageBox.style, {
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "48px",
            color: "white",
            textAlign: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "20px 40px",
            borderRadius: "10px",
            display: "none"
        });

        this.container.appendChild(this.messageBox);
    }

    start() {
        this.createFences();
        this.createPlayer();
        this.setupCamera();
        this.setupCollisionHandler();

        this.activeFence.isActive = true;
        this.isRunning = true;

        this.timer = setTimeout(() => this.endGame("Time's up! You lose!"), this.gameDuration);

        requestAnimationFrame(this.gameLoop.bind(this));
        this.shrinkFenceRecursively();
    }

    stop() {
        this.isRunning = false;
        clearTimeout(this.timer);
        console.log("Game stopped!");
    }

    endGame(message) {
        this.stop();
        this.messageBox.textContent = message;
        this.messageBox.style.display = "block";
    }

    createFences() {
        for (let i = 0; i < this.levels; i++) {
            const width = 12 + i * 10;
            const length = 12 + i * 10;

            let fence = new Fance(this.renderer, i + 1, width, length);
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
        this.playerTank = new PlayerTank("Player1", 1, this.renderer.scene, 0, 0.5, 0);
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
            this.activeFence,
            this.activeFence.walls,
            this.playerTank.bullets,
            this.playerTank,
            this.hiddenWallIndex
        );
    }

    generateNewPuzzle() {
        const phrase = this.gameLogic.pickPhrase();
        const box = document.getElementById("phraseBox");
        if (box) box.textContent = phrase + " " + this.hiddenWallIndex;

        this.collisionHandler.hiddenWallIndex = this.hiddenWallIndex;
    }

    shrinkFenceRecursively() {
        if (!this.activeFence.isActive) return;

        this.generateNewPuzzle();

        this.activeFence.shrink();
        this.collisionHandler.setFence(this.activeFence);

        if (this.activeFence.width > 2 && this.activeFence.length > 2) {
            setTimeout(() => this.shrinkFenceRecursively(), 3000);
        }
    }

    gameLoop(time) {
        if (!this.isRunning) return;

        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.input.handleUserInputs(delta, this.playerTank, this.renderer, this);

        if ( this.activeFence.width < 5 || this.activeFence.length < 5 || this.playerTank.isAlive === false  ) {
            this.endGame("Tank destroyed! You lose!");
            return;
        }

        const lastFence = this.fences[this.fences.length - 1];
        if (lastFence.destroyed === true ) {
            this.endGame("You win! Last fence destroyed!");
            return;
        }

        if (!this.activeFence.isActive && this.activeFence.nextLevel) {
            this.activeFence = this.activeFence.nextLevel;
            this.activeFence.isActive = true;

            this.collisionHandler.setFence(this.activeFence);
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

