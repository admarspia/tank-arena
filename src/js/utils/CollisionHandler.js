import Collistion from "./Collision.js";

const collistion = new Collistion();

export default class CollistionHandler {
    constructor (walls, bullets, tanks){
        this.tankPair = 
        this.tankWallCollisions = collision.tanksMazeCollision(tanks, renderer.walls);
        this.tankBulletCollisions = collision.tanksBulletCollision(tanks, bullets);
        this.bulletWallCollisions = collision.bulletsMazeCollision(bullets, renderer.walls);
    }

    tanksMazeCollision() {
        for (const { tank, wall } of tankWallCollisions) {
            tank.mesh.position.sub(tank.lastMove);
        }
    }

    tankToTankCollision(){
        if (tankPair) {
                tank.mesh.position.sub(tank.lastMove);
        }
        else return;
    }

    tanksBulletCollision(){
        for (const { tank, wall } of tankWallCollisions) {
            tank.mesh.position.sub(tank.lastMove);
        }
    }

    bulletsMazeCollision(){
        for (const { wall, bullet } of bulletWallCollisions) {
            console.log("Bullet hit a wall!");
        }
    }
}
