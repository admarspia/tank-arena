import * as THREE from "three";

export default class Collision {
  constructor() {
    this.box1 = new THREE.Box3();
    this.box2 = new THREE.Box3();
  }

  tanksMazeCollision(tanks, walls) {
    const collisions = [];

    for (const tank of tanks) {
      this.box1.setFromObject(tank.mesh);
      for (const wall of walls) {
        this.box2.setFromObject(wall);
        if (this.box1.intersectsBox(this.box2)) {
          collisions.push({ tank, wall });
        }
      }
    }

    return collisions;
  }


  tanksBulletCollision(tanks, bullets) {
    const collisions = [];

    for (const tank of tanks) {
      this.box1.setFromObject(tank.mesh);
      for (const bullet of bullets) {
        if (!bullet.active) continue; 
          this.box2.setFromObject(bullet.mesh);

        if (this.box1.intersectsBox(this.box2)) {
          bullet.owner.score++;
          bullet.destroy();
          collisions.push({ tank, bullet });
        }
      }
    }

    return collisions;
  }

  tankTankCollision(tanks) {
    for (let i = 0; i < tanks.length; i++) {
      for (let j = i + 1; j < tanks.length; j++) {
        const tankA = tanks[i];
        const tankB = tanks[j];

        this.box1.setFromObject(tankA.mesh);
        this.box2.setFromObject(tankB.mesh);

        if (this.box1.intersectsBox(this.box2)) {
          return { tankA, tankB };
        }
      }
    }
    return null;
  }
 
 bulletsMazeCollision(bullets, walls) {
    const collisions = [];

    for (const bullet of bullets) {
      if (!bullet.active) continue;
      this.box1.setFromObject(bullet.mesh);

      for (const wall of walls) {
        this.box2.setFromObject(wall);
        if (this.box1.intersectsBox(this.box2)) {
          bullet.destroy();
          collisions.push({ wall, bullet });
        }
      }
    }

    return collisions;
  }
}

