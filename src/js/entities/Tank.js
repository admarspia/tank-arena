import Renderer from "../engine/Renderer.js";

export default class TankBody {
    constructor(x, y = 0, z, color = 0x00ff00, speed = 1, width = 2, height = 1, depth = 3, angle = 0) {
        this.px = x;
        this.py = y;
        this.pz = z;
        this.color = color;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.angle = angle; 
        this.speed = speed;

        this.renderer = new Renderer();
        this.mesh = this.renderer.createBlock(
            this.px,
            this.py,
            this.pz,
            this.color,
            this.width,
            this.height,
            this.depth
        );
    }

    moveForward(delta) {
        this.px += Math.sin(this.angle) * this.speed * delta;
        this.pz += Math.cos(this.angle) * this.speed * delta;
        this.updatePosition();
    }

    moveBackward(delta) {
        this.px -= Math.sin(this.angle) * this.speed * delta;
        this.pz -= Math.cos(this.angle) * this.speed * delta;
        this.updatePosition();
    }

    rotateLeft(delta) {
        this.angle += Math.PI / 6 * delta;
        this.updateRotation();
    }

    rotateRight(delta) {
        this.angle -= Math.PI / 6 * delta;
        this.updateRotation();
    }

    setPosition(x, y = this.py, z) {
        this.px = x;
        this.py = y;
        this.pz = z;
        this.updatePosition();
    }

    getPosition() {
        return [this.px, this.py, this.pz];
    }

    setRotation(angle) {
        this.angle = angle;
        this.updateRotation();
    }

    getRotation() {
        return this.angle;
    }

    updatePosition() {
        this.mesh.position.set(this.px, this.py, this.pz);
    }

    updateRotation() {
        this.mesh.rotation.y = this.angle;
    }

    render(scene) {
        scene.add(this.mesh);
    }
}

