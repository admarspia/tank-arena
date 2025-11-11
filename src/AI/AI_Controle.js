import * as THREE from "three";

export default class AIController {
  constructor(aiTanks, playerTank, bullets, scene) {
    this.aiTanks = aiTanks;
    this.playerTank = playerTank;
    this.bullets = bullets;
    this.scene = scene;
  }

  update(delta) {
    for (const tank of this.aiTanks) {
      if (!tank.isAlive) continue;

      // Move towards player
      const dir = this.playerTank.getPosition().clone().sub(tank.mesh.position).normalize();
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(tank.mesh.quaternion);

      const angle = forward.angleTo(dir);
      const cross = forward.clone().cross(dir).y;
      if (Math.abs(angle) > 0.1) {
        if (cross > 0) tank.rotateLeft(delta);
        else tank.rotateRight(delta);
      } else {
        tank.moveForward(delta);
      }

      // Random shooting
      if (Math.random() < 0.01) {
        tank.fire(this.bullets, this.scene);
      }
    }
  }
}

