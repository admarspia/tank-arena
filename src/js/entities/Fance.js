import Wall from "./Wall.js";

export default class Fance {
    constructor(renderer, fanceLevel, width, length, blocksize = 2, color = {
            color: 0x444444,  
            roughness: 0.6,
            metalness: 0.1
        }) {
        this.renderer = renderer;
        this.color = color;
        this.fanceLevel = fanceLevel;
        this.width = width;    
        this.length = length; 
        this.blocksize = blocksize;
        this.walls = [];
        this.isActive = true;
        this.destroyed = false;
        this.nextLevel = null;

        this.x = 0; 
        this.z = 0;
    }

    addWall(x, z, height = 4) {
        const mesh = this.renderer.createWallBlock(
            x,
            height / 2,
            z,
            this.blocksize,
            height,
            this.color
        );
        this.walls.push(new Wall(mesh));
        this.renderer.scene.add(mesh);
    }

    openFance(pos, n) 
    { for (let i = pos; i < pos + n && i < this.walls.length; i++) 
        { this.walls[i].destroy(); } }
    closeFance(pos, n) {
        for (let i = pos; i < pos + n && i < this.walls.length; i++) { 
            this.walls[i].restore(this.renderer.scene); }
    }

    createFance() {
        this.walls = [];
        const bs = this.blocksize;
        const height = 4;

        const halfWidth = this.width * bs / 2;
        const halfLength = this.length * bs / 2;

        const left = -halfWidth;
        const right = halfWidth - bs;
        const top = halfLength;
        const bottom = -halfLength + bs;

        for (let x = left; x <= right; x += bs) this.addWall(x, top, height);
        for (let z = top; z >= bottom; z -= bs) this.addWall(right, z, height);
        for (let x = right; x >= left; x -= bs) this.addWall(x, bottom, height);
        for (let z = bottom; z <= top; z += bs) this.addWall(left, z, height);
    }

    shrink() {
        if (this.width <= 2 || this.length <= 2) return; 
        for (let wall of this.walls) wall.destroy();
        this.walls = [];

        this.width -= 1; 
        this.length -= 1;

        this.createFance();
    }
}

