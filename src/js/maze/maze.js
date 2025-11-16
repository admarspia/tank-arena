export default class Maze {
    constructor(width, height) {
        this.width = width % 2 === 0 ? width + 1 : width;
        this.height = height % 2 === 0 ? height + 1 : height;

        this.maze = Array.from({ length: this.height }, () => Array(this.width).fill(1)); // 1 = wall, 0 = path
    }

    generate(x = 1, y = 1) {
        const directions = [
            [0, 2],
            [0, -2],
            [2, 0],
            [-2, 0],
        ].sort(() => Math.random() - 0.5);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                ny > 0 &&
                nx > 0 &&
                nx < this.width - 1 &&
                ny < this.height - 1 &&
                this.maze[ny][nx] === 1
            ) {
                this.maze[y + dy / 2][x + dx / 2] = 0;
                this.maze[ny][nx] = 0;
                this.generate(nx, ny);
            }
        }
    }

    getGrid() {
        return this.maze;
    }

    removeTop(){
        for (let i = 0; i < this.width; i++){
            this.maze[0][i] = 0;
        }
    }

    removeRight(){
        for (let i = 0; i < this.height; i++){
            this.maze[i][this.width -1] = 0;
        }
    }

    removeLeft(){
        for (let i = 0; i < this.height; i++){
            this.maze[0][i] = 0;
        }
    }

    removeBottom(){
        for (let i = 0; i < this.width; i++){
            this.maze[i][0] = 0;
        }

    }
    removeTop(){
        for (let i = 0; i < this.width; i++){
            this.maze[this.height -1][i] = 0;
        }
    }

    removeBorder(){
        this.removeTop();
        this.removeRight();
        this.removeLeft();
        this.removeBottom();

    }



    createCenterSquare(size = 3) {
        const half = Math.floor(size / 2);

        const cx = Math.floor(this.width / 2);
        const cy = Math.floor(this.height / 2);

        for (let y = -half; y <= half; y++) {
            for (let x = -half; x <= half; x++) {
                const gy = cy + y;
                const gx = cx + x;

                if (gy > 0 && gy < this.height - 1 && gx > 0 && gx < this.width - 1) {
                    this[gy][gx] = 0; // make it open
                }
            }
        }
    }

}





