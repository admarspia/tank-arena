import Wall from "./Wall.js";

export default class Fance {
  constructor(renderer, fanceLevel, x, z, length, width, blocksize = 2) {
    this.renderer = renderer;
    this.fanceLevel = fanceLevel;
    this.x = x;
    this.z = z;
    this.length = length;
    this.width = width;
    this.blocksize = blocksize;
    this.walls = [];
    this.isActive = true;
    this.nextLevel = null;

    this.colorSet = [0xff0000, 0x00ff00, 0x0000ff];
    this.colorIndex = 0;
  }

  getNextColor() {
    const col = this.colorSet[this.colorIndex];
    this.colorIndex = (this.colorIndex + 1) % this.colorSet.length;
    return col;
  }

  addWall(x, z, height) {
    const mesh = this.renderer.createBlock(
      x,
      height / 2,
      z,
      this.getNextColor(),
      this.blocksize,
      height,
      this.blocksize
    );
    this.walls.push(new Wall(mesh));
    this.renderer.scene.add(mesh);
  }

  createFance() {
    this.walls = [];
    this.colorIndex = 0;

    const bs = this.blocksize;
    const height = 4;

    const left = this.x - this.width * bs;
    const right = this.x;
    const top = this.z;
    const bottom = this.z - this.length * bs;

    for (let x = left; x <= right; x += bs) this.addWall(x, top, height);
    for (let z = top; z >= bottom; z -= bs) this.addWall(right, z, height);
    for (let x = right; x >= left; x -= bs) this.addWall(x, bottom, height);
    for (let z = bottom; z <= top; z += bs) this.addWall(left, z, height);
  }

  openFance(pos, n) {
    for (let i = pos; i < pos + n && i < this.walls.length; i++) {
      this.walls[i].destroy();
    }
  }

  closeFance(pos, n) {
    for (let i = pos; i < pos + n && i < this.walls.length; i++) {
      this.walls[i].restore(this.renderer.scene);
    }
  }

  shrink() {
    for (let wall of this.walls) wall.destroy();
    this.walls = [];
    this.width = Math.max(1, this.width - 1);
    this.length = Math.max(1, this.length - 1);
    this.createFance();
  }
}

