import * as THREE from "three";
import Renderer from "../src/js/engine/Renderer.js";
import Input from "../src/js/engine/Input.js";
import ThirdPersonCamera from "../src/js/engine/Camera.js";
import PlayerTank from "../src/js/entities/PlayerTank.js";
import Fance from "../src/js/entities/Fance.js";
import CollisionHandler from "../src/js/utils/CollisionHandler.js";

const renderer = new Renderer();
const input = new Input();

let fences = [];
const levels = 3;
let activeFence = null;

for (let i = 0; i < levels; i++) {
  let fence = new Fance(
    renderer,
    1,
    20 + (i * 10),
    20 + (i * 10),
    12 + (i * 10),
    12 + (i * 10)
  );

  fence.createFance();
  fence.isActive = false;
  fences.push(fence);
}

for (let i = 0; i < levels - 1; i++) {
  fences[i].nextLevel = fences[i + 1];
}
fences[levels - 1].nextLevel = null;

fences[0].isActive = true;
activeFence = fences[0];

const playerTank = new PlayerTank("Player1", 1, renderer.scene, 5, 0.5, 5);
renderer.scene.add(playerTank.mesh);

const cameraController = new ThirdPersonCamera(renderer.camera, playerTank, {
  distance: 5,
  height: 3,
});

const hiddenWallIndex = 3;

const collisionHandler = new CollisionHandler(
  activeFence,
  activeFence.walls,
  playerTank.bullets,
  playerTank,
  hiddenWallIndex
);

let lastTime = 0;

const shrinkFenceRecursively = () => {
  if (!activeFence.isActive) return;
  activeFence.shrink();
  collisionHandler.setFence(activeFence);

  if (activeFence.width > 2 && activeFence.length > 2) {
    setTimeout(shrinkFenceRecursively, 5000);
  }
};

shrinkFenceRecursively();

function gameLoop(time) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  input.handleUserInputs(delta, playerTank, renderer);

  if (!activeFence.isActive && activeFence.nextLevel) {
    activeFence = activeFence.nextLevel;
    activeFence.isActive = true;
    collisionHandler.setFence(activeFence);
    shrinkFenceRecursively();
  }

  collisionHandler.update();
  playerTank.updateBullets(delta);

  cameraController.update(delta);
  renderer.render();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

