import Renderer from "../../engine/Renderer.js";
import Turret from "./Turret.js";

export default class TankBody {
  constructor(x, y = 0, z, color = 0x00ff00, speed = 1, width = 2, height = 1, depth = 3) {
    this.px = x;
    this.py = y;
    this.pz = z;
    this.color = color;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.angle = 0;
    this.speed = speed;

    this.renderer = new Renderer();
    this.mesh = this.renderer.createBlock(x, y, z, color, width, height, depth);
    this.turret = new Turret(this);

    this.renderer.scene.add(this.mesh);
  }

  moveForward(delta) {
    this.px += Math.sin(this.angle) * this.speed * delta;
    this.pz += Math.cos(this.angle) * this.speed * delta;
    this.updatePosition();
  }

  moveBackward(delta) {
    this.px -= Math.sin(this.angle) * this.speed * delta;
    this.pz -= Math.cos(this.angle) * this.speed * delta;
    this.updatePosition();
  }

  rotateLeft(delta) {
    this.angle += Math.PI / 6 * delta;
    this.updateRotation();
  }

  rotateRight(delta) {
    this.angle -= Math.PI / 6 * delta;
    this.updateRotation();
  }

  updatePosition() {
    this.mesh.position.set(this.px, this.py, this.pz);
  }

  updateRotation() {
    this.mesh.rotation.y = this.angle;
  }
}

