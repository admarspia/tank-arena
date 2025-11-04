import Renderer from "../src/js/engine/Renderer.js";
import TankBody from "../src/js/entities/tank/body.js";
import Input from "../src/js/engine/Input.js";
import Maze from "../src/js/maze/maze.js";
import ThirdPersonCamera from "../src/js/engine/Camera.js";
import Collision from "../src/js/utils/Collision.js";

const collision = new Collision();
const renderer = new Renderer();
const input = new Input();

const maze = new Maze(15, 15);
maze.generate();
renderer.createMaze(maze.getGrid(), 6, 5);

const tank = new TankBody(0, 0.5, 0, renderer); renderer.scene.add(tank.mesh);
const tank2 = new TankBody(0, 0.5,2  , renderer); renderer.scene.add(tank2.mesh);
tank.moveBackward(1);
tank2.moveBackward(1);

const cameraController = new ThirdPersonCamera(renderer.camera, tank, { distance: 10, height: 5 });

const bullets = [];
let lastTime = 0;
let lastShotTime = 0;
const shootInterval = 0.2;

function gameLoop(time) {
    const delta = (time - lastTime) / 1000;
    lastTime = time;

    if (input.isDown("ArrowDown")) tank.moveForward(delta);
    if (input.isDown("ArrowUp")) tank.moveBackward(delta);
    if (input.isDown("ArrowLeft")) tank.rotateLeft(delta);
    if (input.isDown("ArrowRight")) tank.rotateRight(delta);
    if (input.isDown("i")) tank.turret.barrel.aimUp(delta);
    if (input.isDown("k")) tank.turret.barrel.aimDown(delta);
    if (input.isDown("j")) tank.turret.rotateLeft(delta);
    if (input.isDown("l")) tank.turret.rotateRight(delta);

    if (input.isDown("x") && time - lastShotTime > shootInterval * 1000) {
        tank.turret.barrel.shoot(bullets, renderer.scene);
        lastShotTime = time;
    }



    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.update(delta);
        if (!bullet.active) bullets.splice(i, 1);
    }

    const tanks = [tank,tank2]; 
    const tankWallCollisions = collision.tanksMazeCollision(tanks, renderer.walls);
    const tankBulletCollisions = collision.tanksBulletCollision(tanks, bullets);
    const bulletWallCollisions = collision.bulletsMazeCollision(bullets, renderer.walls);

    const tankPair = collision.tankTankCollision(tanks);
    if (tankPair) {
        tank.mesh.position.sub(tank.lastMove);
    }

    for (const { tank, wall } of tankWallCollisions) {
        tank.mesh.position.sub(tank.lastMove);
    }

    for (const { tank, bullet } of tankBulletCollisions) {
        tank.hitted++;
        console.log(`got hit!`);
    }

    for (const { wall, bullet } of bulletWallCollisions) {
        console.log("Bullet hit a wall!");
    }

    cameraController.update(delta);

    renderer.render();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
