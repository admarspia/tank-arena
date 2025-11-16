import Renderer from "../../engine/Renderer.js";
import Barrel from "./Barrel.js";

export default class Turret {
    constructor(body, color = 0xff0000, width = 1, height = 0.5, depth = 1) {
        this.body = body;
        this.rotationAngle = 0;
        this.color = color;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.renderer = new Renderer();

        this.mesh = this.renderer.createBlock(0, this.body.height / 2, 0, color, width, height, depth);
        this.body.mesh.add(this.mesh);

        this.barrel = new Barrel(this.body,this, 2, 0.1, 0.2, 0x558852);
    }

    rotateLeft(delta) {
        this.rotationAngle += delta * 0.8;
        this.updateRotation();
    }

    rotateRight(delta) {
        this.rotationAngle -= delta * 0.8;
        this.updateRotation();
    }

    updateRotation() {
        this.mesh.rotation.y = this.rotationAngle;
    }
}

