export default class Input {
  constructor() {
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, buttons: new Set() };

    window.addEventListener('keydown', e => this.keys.add(e.key));
    window.addEventListener('keyup', e => this.keys.delete(e.key));

  }

  isDown(key) {
    return this.keys.has(key);
  }

  handleUserInputs(delta, tank){
    if (this.isDown("ArrowDown")) tank.moveForward(delta);
    if (this.isDown("ArrowUp")) tank.moveBackward(delta);
    if (this.isDown("ArrowLeft")) tank.rotateLeft(delta);
    if (this.isDown("ArrowRight")) tank.rotateRight(delta);
    if (this.isDown("i")) tank.aimUp(delta);
    if (this.isDown("k")) tank.aimDown(delta);
    if (this.isDown("j")) tank.rotateLeft(delta);
    if (this.isDown("l")) tank.rotateRight(delta);
    if (this.isDown("x")) tank.fire(renderer.scene);

      
  } 
}

