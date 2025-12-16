//initialization
const breakSound = new Audio("audio%20file/mixkit-explosive-impact-from-afar-2758.wav");
const notBreakSound = new Audio("audio%20file/mixkit-empty-tube-hit-3197.wav");

import * as THREE from "three";

export default class CollisionHandler {
    constructor(game, fence, walls, bullets, playerTank, hiddenWallIndex) {
        this.game = game;
        this.fence = fence;
        this.walls = walls;
        this.bullets = bullets;
        this.playerTank = playerTank;
        this.hiddenWallIndex = hiddenWallIndex;
    }

    setFence(fence) {
        this.fence = fence;
        this.walls = fence.walls;
    }

    update() {
        const tankBox = new THREE.Box3().setFromObject(this.playerTank.mesh);

        for (let i = 0; i < this.walls.length; i++) {
            const wall = this.walls[i];
            if (!wall.isActive) continue;

            const wallBox = new THREE.Box3().setFromObject(wall.mesh);

            if (tankBox.intersectsBox(wallBox)) {
                if (i === this.hiddenWallIndex) {
                    this.fence.openFance(i, 3);
                    this.fence.isActive = false;    
                } else {
                    this.playerTank.isAlive = false;
                    this.playerTank.mesh.position.sub(this.playerTank.lastMove);
                }
            }
        }

        for (let bullet of this.bullets) {
            if (!bullet.active) continue;

            const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);

            for (let i = 0; i < this.walls.length; i++) {
                const wall = this.walls[i];
                if (!wall.isActive) continue;

                const wallBox = new THREE.Box3().setFromObject(wall.mesh);

                if (bulletBox.intersectsBox(wallBox)) {
                    bullet.destroy();
                    if (i === this.hiddenWallIndex) {
                        //sound playing
                        breakSound.currentTime = 0;
                        breakSound.play();
                        
                        this.fence.openFance(i, 3);
                        this.fence.isActive = false;
                        this.fence.destroyed = true;
                        clearTimeout(this.game.shrinkTimeout);

                    }
                    //not break sound
                   else {
                      notBreakSound.currentTime = 0;
                      notBreakSound.play();
                    }
                }
            }
        }
    }
}

