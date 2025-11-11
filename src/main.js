import Renderer from "../src/js/engine/Renderer.js";
import Input from "../src/js/engine/Input.js";
import Maze from "../src/js/maze/maze.js";
import ThirdPersonCamera from "../src/js/engine/Camera.js";
import CollisionHandler from "../src/js/utils/CollisionHandler.js";
import PlayerTank from "../src/js/entities/PlayerTank.js";
import AITank from "../src/js/entities/AI_Tank.js";

const renderer = new Renderer();
const input = new Input();

const maze = new Maze(15, 15);
maze.generate();
renderer.createMaze(maze.getGrid(), 6, 5);

const playerTank = new PlayerTank("Player1", 1, renderer.scene, 0, 0.5, 0);
renderer.scene.add(playerTank.mesh);

const aiTank = new AITank("t1", renderer.scene, 5, 0.5, 5);
renderer.scene.add(aiTank.mesh);

const cameraController = new ThirdPersonCamera(renderer.camera, playerTank, {
  distance: 10,
  height: 5,
});

const bullets = [...playerTank.bullets, ...aiTank.bullets];
const tanks = [playerTank, aiTank];
playerTank.moveForward(0.5);
aiTank.moveBackward(0.5);

let lastTime = 0;

const collisionHandler = new CollisionHandler(renderer.walls, bullets, tanks);


function gameLoop(time) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  input.handleUserInputs(delta, playerTank, renderer);
  collisionHandler.update();
  playerTank.updateBullets(delta);

  cameraController.update(delta);
  renderer.render();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

