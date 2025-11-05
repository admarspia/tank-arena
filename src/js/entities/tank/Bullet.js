import * as THREE from "three";

export default class Bullet {
  constructor(owner, position, direction, scene, speed = 20, size = 0.1, color = 0xffff00) {
    this.speed = speed;
    this.size = size;
    this.color = color;
    this.active = true;
    this.limit = 100;
    this.owner = owner;
    this.position = position.clone();
    this.direction = direction.clone().normalize();

    const geometry = new THREE.SphereGeometry(this.size, 8, 8);
    const material = new THREE.MeshStandardMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.copy(this.position);
    scene.add(this.mesh);
  }

  update(delta) {
    if (!this.active) return;

    this.position.addScaledVector(this.direction, this.speed * delta);
    this.mesh.position.copy(this.position);

    if (Math.abs(this.position.x) > this.limit ||
        Math.abs(this.position.z) > this.limit ||
        Math.abs(this.position.y) > 50) {
      this.destroy();
    }
  }

  destroy() {
    this.active = false;
    if (this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  }
}

