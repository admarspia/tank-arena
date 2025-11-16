import Renderer from "../../engine/Renderer.js";
import Barrel from "./Barrel.js";

export default class Turret {
    constructor(body, color = { color: 0x2F4F4F, roughness: 0.6, metalness: 0.3 } , width = 1, height = 0.5, depth = 1) {
        this.body = body;
        this.rotationAngle = 0;
        this.color = color;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.renderer = new Renderer();

        this.mesh = this.renderer.createBlock(0, this.body.height / 2, 0, color, width, height, depth);
        this.body.mesh.add(this.mesh);

        this.barrel = new Barrel(this.body,this, 2, 0.1, 0.2, { color: 0x000000, roughness: 0.5, metalness: 0.5 });
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

