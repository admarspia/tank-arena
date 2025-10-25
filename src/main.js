import Renderer from "../src/js/engine/Renderer.js";
import Maze from "../src/js/maze/maze.js";
import TankBody from "../src/js/entities/tank/body.js";
import Input from "../src/js/engine/Input.js";

const renderer = new Renderer();
const maze = new Maze(15, 15);
maze.generate(); renderer.createMaze(maze.getGrid(), 4, 2);
const tank = new TankBody(0, 0.5, 0); renderer.scene.add(tank.mesh);
const input = new Input(); const bullets = [];
let lastTime = 0; const offset = new THREE.Vector3(0, 2, -5);
const tankDirection = new THREE.Vector3(); const tankPosition = new THREE.Vector3();

function gameLoop(time) { const delta = (time - lastTime) / 1000; lastTime = time;
                         if (input.isDown("ArrowUp")) tank.moveForward(delta);
                         if (input.isDown("ArrowDown")) tank.moveBackward(delta);
                         if (input.isDown("ArrowLeft")) tank.rotateLeft(delta);
                         if (input.isDown("ArrowRight")) tank.rotateRight(delta);
                         if (input.isDown("i")) tank.turret.barrel.aimUp(delta);
                         if (input.isDown("k")) tank.turret.barrel.aimDown(delta);
                         if (input.isDown("j")) tank.turret.rotateLeft(delta);
                         if (input.isDown("l")) tank.turret.rotateRight(delta);
                         if (input.isDown("x")) tank.turret.barrel.shoot(bullets, renderer.scene);
                         
                         for (let i = bullets.length - 1; i >= 0; i--) { 
                                 const bullet = bullets[i]; bullet.update(delta);
                                  if (!bullet.active) bullets.splice(i, 1); 
                         }
                         renderer.render();
                         requestAnimationFrame(gameLoop);
  } 

requestAnimationFrame(gameLoop);

