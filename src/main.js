import Renderer from "../src/js/engine/Renderer.js";
import TankBody from "../src/js/entities/tank/body.js";
import Input from "../src/js/engine/Input.js";
import Maze from "../src/js/maze/maze.js";
import ThirdPersonCamera from "../src/js/engine/Camera.js";
import CollisionHandler from "../src/js/utils/CollisionHandler.js";
import PlayerTank from "../src/js/entities/PlayerTank.js"

const renderer = new Renderer();
const input = new Input();

const maze = new Maze(15, 15);
maze.generate();
renderer.createMaze(maze.getGrid(), 6, 5);

const playerTank = new PlayerTank("Player1", 1, renderer.scene,0, 0.5, 0, renderer); renderer.scene.add(playerTank.mesh);
const tank2 = new TankBody(0, 0.5,2  , renderer); renderer.scene.add(tank2.mesh);
tank.moveBackward(1);
tank2.moveBackward(1);

const cameraController = new ThirdPersonCamera(renderer.camera, tank, { distance: 10, height: 5 });


const bullets = [];
const tanks = [tank1, tank2];

const collisionHandler = new CollisionHandler(bullets,tanks);



function gameLoop(time) {
    const delta = (time - lastTime) / 1000;
    input.handleUserInput(delta,playerTank);

    collisionHandler.tanksMazeCollision();
    collisionHandler.tankToTankCollison();
    collisionHandler.bulletMazeCollisoin();
    collisionHandler.tanksBulletCollision();

    cameraController.update(delta);

    renderer.render();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
