import * as THREE from "three";
import Renderer from "../src/js/engine/Renderer.js";
import Maze from "../src/js/maze/maze.js";
import TankBody from "../src/js/entities/tank/body.js";
import Input from "../src/js/engine/Input.js";

// === Setup scene ===
const renderer = new Renderer();
const maze = new Maze(15, 15);
maze.generate();
renderer.createMaze(maze.getGrid(), 4, 2);

const tank = new TankBody(0, 0.5, 0);
renderer.scene.add(tank.mesh);

const input = new Input();
const bullets = [];

// === Camera control variables ===
const clock = new THREE.Clock();
let cameraDistance = 6;                // zoom distance
const cameraDirection = new THREE.Spherical(1, Math.PI / 180 * 70, 0); // vertical angle (phi), horizontal (theta)
const cameraDefault = new THREE.Spherical(1, cameraDirection.phi, cameraDirection.theta);

let buttonDown = -1;
const mouse = new THREE.Vector2(0, 0);
const orbit = new THREE.Spherical(1, 0, 0);
const playerHeadOffset = new THREE.Vector3(0, 1.5, 0); // where the camera looks (above tank center)
const up = new THREE.Vector3(0, 1, 0);

// working vectors
const _cameraPos = new THREE.Vector3();
const _headPos = new THREE.Vector3();
const _rot = new THREE.Quaternion();
const turretDir = new THREE.Vector3();
const tankPos = new THREE.Vector3();

let lastTime = 0;

// === Mouse + Wheel controls ===
window.addEventListener("mousedown", (e) => {
  buttonDown = e.button;
  mouse.set(e.pageX, e.pageY);
  orbit.copy(cameraDirection);
});
window.addEventListener("mouseup", () => {
  buttonDown = -1;
});
window.addEventListener("mousemove", (e) => {
  if (buttonDown >= 0) {
    const dx = (e.pageX - mouse.x) / (window.innerWidth / 2);
    const dy = (mouse.y - e.pageY) / (window.innerHeight / 2);

    if (buttonDown === 2) {
      // RMB -> orbit camera around tank
      cameraDirection.set(1, orbit.phi + dy * 2.0, orbit.theta - dx).makeSafe();
    }
  }
});
window.addEventListener("wheel", (e) => {
  cameraDistance = Math.max(2, Math.min(12, cameraDistance + Math.sign(e.deltaY) * 0.3));
});
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

function gameLoop(time) {
  const delta = clock.getDelta();

  // === Tank Controls ===
  if (input.isDown("ArrowUp")) tank.moveForward(delta);
  if (input.isDown("ArrowDown")) tank.moveBackward(delta);
  if (input.isDown("ArrowLeft")) tank.rotateLeft(delta);
  if (input.isDown("ArrowRight")) tank.rotateRight(delta);

  if (input.isDown("i")) tank.turret.barrel.aimUp(delta);
  if (input.isDown("k")) tank.turret.barrel.aimDown(delta);
  if (input.isDown("j")) tank.turret.rotateLeft(delta);
  if (input.isDown("l")) tank.turret.rotateRight(delta);
  if (input.isDown("x")) tank.turret.barrel.shoot(bullets, renderer.scene);

  // === Camera positioning (spherical method) ===
  // Get tank head position (where we look)
  tank.mesh.getWorldPosition(tankPos);
  _headPos.copy(tankPos).add(playerHeadOffset);

  // Slowly move back to default if not moving camera
  if (buttonDown === -1) {
    cameraDirection.set(
      1,
      THREE.MathUtils.lerp(cameraDirection.phi, cameraDefault.phi, 0.1),
      THREE.MathUtils.lerp(cameraDirection.theta, cameraDefault.theta, 0.1)
    );
  }

  // Convert spherical to cartesian, scaled by distance
  _cameraPos.setFromSpherical(cameraDirection);
  _cameraPos.normalize().multiplyScalar(cameraDistance);

  // Apply tank rotation to keep camera behind relative to tank
  _cameraPos.applyQuaternion(tank.mesh.quaternion);

  // Position camera relative to tank
  _cameraPos.add(_headPos);
  renderer.camera.position.lerp(_cameraPos, 0.2);

  // Camera looks at tank’s head
  renderer.camera.lookAt(_headPos);

  // === Bullets ===
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.update(delta);
    if (!bullet.active) bullets.splice(i, 1);
  }

  renderer.render();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

