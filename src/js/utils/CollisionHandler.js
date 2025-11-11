import Collision from "./Collision.js";

export default class CollisionHandler {
  constructor(walls, bullets, tanks) {
    this.walls = walls;
    this.bullets = bullets;
    this.tanks = tanks;
    this.collision = new Collision();
  }

  update() {
    const tankWallCollisions = this.collision.tanksMazeCollision(this.tanks, this.walls);
    const tankTankCollision = this.collision.tankTankCollision(this.tanks);
    const tankBulletCollisions = this.collision.tanksBulletCollision(this.tanks, this.bullets);
    const bulletWallCollisions = this.collision.bulletsMazeCollision(this.bullets, this.walls);

    for (const { tank } of tankWallCollisions) {
      tank.mesh.position.sub(tank.lastMove);
    }

    if (tankTankCollision) {
      tankTankCollision.tankA.mesh.position.sub(tankTankCollision.tankA.lastMove);
      tankTankCollision.tankB.mesh.position.sub(tankTankCollision.tankB.lastMove);
    }

    for (const { tank } of tankBulletCollisions) {
      tank.hitted++;
      console.log("Tank hit by bullet!");
    }

    for (const { bullet } of bulletWallCollisions) {
      bullet.destroy();
      console.log("Bullet hit a wall!");
    }
  }
}

