import Tank from "./tank/body.js";

export default class AI_Tank extends Tank {
    super(x, y = 0, z, color = 0x00ff70, speed = 5, width = 2, height = 1, depth = 3);
    constructor (playerName, level, scene ){
        this.playerName = playerName;
        this.score = 0;
        this.level = level;
        this.life = 100;
        this.isAlive = true;
        this.interval = 0;
        this.scene = scene;
    }
    
    damage(amount){
        this.life -= amount;
        if (this.life <= 0) distroy();
    }

    distroy() {
        this.life = false;
        super.mash.parent.remove(super.mesh);
        console.log("Game over! you bullshit how do you get shited by this ai tanks!");
    }

    moveForward (delta) {
        super.moveForward(delta);
    }

    moveBackward(delta) {
        super.moveBackward(delta);
    }

    rotateLeft(delta){
        super.rotateLeft(delta);
    }

    rotateRight(delta){
        super.rotateRight(delta);
    }

    const bullets = [];

    fire(this.scene, bullets){
        super.turret.barrel.shoot(bullets,scene);
    }

    respawn (){
        this.score = 0;
        this.life = 100;
        this.ammo = 1000;
        this.isAlive = true;
        this.interval = 0;
    }
  
}
