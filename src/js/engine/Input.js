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

  isMouseDown(button = 0) {
    return this.mouse.buttons.has(button);
  }
}

