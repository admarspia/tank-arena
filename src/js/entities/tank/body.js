import Renderer from "../../engine/Renderer.js";
import Turret from "./Turret.js";
import * as THREE from "three";

const { Vector3, Quaternion } = THREE;

export default class TankBody {
  constructor(
    x,
    y = 0,
    z,
    color = 0x00ff00,
    speed = 5,
    width = 1,
    height = 1,
    depth = 3
  ) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.speed = speed;

    this.score = 0;
    this.hitted = 0;

    this.renderer = new Renderer();
    this.mesh = this.renderer.createBlock(
      x,
      height / 2,
      z,
      color,
      width,
      height,
      depth
    );

    this.turret = new Turret(this);

    this.renderer.scene.add(this.mesh);

    this.forward = new Vector3(0, 0, -1);
    this._rot = new Quaternion();
    this._move = new Vector3();
    this._tempFwd = new Vector3();

    this.lastMove = new Vector3();
  }

  moveForward(delta) {
    this._tempFwd.set(0, 0, -1).applyQuaternion(this.mesh.quaternion);
    this._move.copy(this._tempFwd).normalize().multiplyScalar(this.speed * delta);

    this.mesh.position.add(this._move);
    this.lastMove.copy(this._move);
  }

  moveBackward(delta) {
    this._tempFwd.set(0, 0, -1).applyQuaternion(this.mesh.quaternion);
    this._move.copy(this._tempFwd).normalize().multiplyScalar(this.speed * delta);

    this.mesh.position.sub(this._move);
    this.lastMove.copy(this._move).negate();
  }

  rotateLeft(delta) {
    this._rot.setFromAxisAngle(new Vector3(0, 1, 0), delta * 0.8);
    this.mesh.quaternion.multiply(this._rot);
  }

  rotateRight(delta) {
    this._rot.setFromAxisAngle(new Vector3(0, 1, 0), -delta * 0.8);
    this.mesh.quaternion.multiply(this._rot);
  }
}

