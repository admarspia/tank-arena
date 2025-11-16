export default class Wall {
  constructor(mesh) {
    this.mesh = mesh;
    this.isActive = true;
  }

  destroy() {
    if (this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
    this.isActive = false;
  }

  restore(scene) {
    if (!this.isActive) {
      scene.add(this.mesh);
      this.isActive = true;
    }
  }

  setActive(state) {
    this.isActive = state;
    this.mesh.visible = state;
  }
}

