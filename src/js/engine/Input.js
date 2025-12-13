//intialization
const shootSound = new Audio("audio%20file/mixkit-arcade-game-explosion-2759.wav");
shootSound.volume = 0.4;

export default class Input {
    constructor() {
        this.keys = new Set();
       //previous state
        movement state
        this.isMoving = false;
        this.engineSound = new Audio("audio/engine.mp3");
        this.brakeSound = new Audio("audio/brake.mp3");
    //audio sound
        this.engineSound.loop = true;   // Engine keeps running while moving
        this.engineSound.volume = 0.6;  // Adjust as needed
        this.brakeSound.volume = 0.8;   // Brake sound louder

        window.addEventListener("keydown", e => this.keys.add(e.key));
        window.addEventListener("keyup", e => this.keys.delete(e.key));
    }

    isDown(key) {
        return this.keys.has(key);
    }


    handleUserInputs(delta, tank, renderer, game) {
        //instantiation 
        const movingNow =
            this.isDown("ArrowDown") ||
            this.isDown("ArrowUp") ||
            this.isDown("ArrowLeft") ||
            this.isDown("ArrowRight");
        //movement sound
        if (movingNow && !this.isMoving) {
            this.engineSound.play();
        }
       //brake sound
        WHEN movement stops
        if (!movingNow && this.isMoving) {
            this.engineSound.pause();
            this.engineSound.currentTime = 0;
            this.brakeSound.play();
        }

        this.isMoving = movingNow;
        if (this.isDown("ArrowDown")) tank.moveForward(delta);
        if (this.isDown("ArrowUp")) tank.moveBackward(delta);
        if (this.isDown("ArrowLeft")) tank.rotateLeft(delta);
        if (this.isDown("ArrowRight")) tank.rotateRight(delta);
// Inside key check
        if (this.isDown("x")) {
          shootSound.currentTime = 0; // rewind to play instantly
          shootSound.play();
          tank.fire(renderer.scene);
         }

        if (this.isDown("s")) game.stop();
        if (this.isDown("r")) game.resume();

    }
}

