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
}

