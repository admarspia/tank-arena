import * as THREE from "three";

export default class Collision {
  constructor() {
    this.box1 = new THREE.Box3();
    this.box2 = new THREE.Box3();
  }

  // Tank will collide only with active walls
  tankWallCollision(tank, walls) {
    const collisions = [];
    this.box1.setFromObject(tank.mesh);

    for (const wall of walls) {
      if (!wall.isActive) continue;

      this.box2.setFromObject(wall.mesh);

      if (this.box1.intersectsBox(this.box2)) {
        collisions.push(wall);
      }
    }

    return collisions;
  }

  // Bullet hits wall, but destruction depends on number check
  bulletWallCollision(bullets, walls) {
    const collisions = [];

    for (const bullet of bullets) {
      if (!bullet.active) continue;

      this.box1.setFromObject(bullet.mesh);

      for (const wall of walls) {
        if (!wall.isActive) continue;

        this.box2.setFromObject(wall.mesh);

        if (this.box1.intersectsBox(this.box2)) {
          collisions.push({ bullet, wall });
        }
      }
    }

    return collisions;
  }
}

