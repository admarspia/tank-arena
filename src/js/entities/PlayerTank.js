import TankBody from "./tank/body.js";

export default class PlayerTank extends TankBody {
  constructor(playerName, level, scene, x, y = 0, z, color = 0x00ff00, speed = 5, width = 2, height = 1, depth = 2.5) {
    super(x, y, z, color, speed, width, height, depth);

    this.playerName = playerName;
    this.level = level;
    this.score = 0;
    this.life = 100;
    this.ammo = 1000;
    this.isAlive = true;
    this.scene = scene;
    this.lastShotTime = 0;
    this.bullets = [];
  }

  damage(amount) {
    this.life -= amount;
    if (this.life <= 0) this.destroy();
  }

  destroy() {
    this.isAlive = false;
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
    console.log("Game over! You got destroyed by the AI tanks!");
  }

  moveForward(delta) {
    super.moveForward(delta);
  }

  moveBackward(delta) {
    super.moveBackward(delta);
  }

  rotateLeft(delta) {
    super.rotateLeft(delta);
  }

  rotateRight(delta) {
    super.rotateRight(delta);
  }



fire(scene) {
  const shootInterval = 0.2;
  const now = Date.now();

  if (now - this.lastShotTime > shootInterval * 1000) {
    this.turret.barrel.shoot(this.bullets, scene);
    this.lastShotTime = now;
  }
}

// New method to update bullets
updateBullets(delta) {
  for (let i = this.bullets.length - 1; i >= 0; i--) {
    const bullet = this.bullets[i];
    bullet.update(delta);
    if (!bullet.active) this.bullets.splice(i, 1);
  }
}


  getScore() {
    return this.score;
  }

  getPosition() {
    return this.mesh.position;
  }

  respawn() {
    this.score = 0;
    this.life = 100;
    this.ammo = 1000;
    this.isAlive = true;
  }
}

