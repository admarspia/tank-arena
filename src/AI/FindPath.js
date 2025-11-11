export default class PathFinder {
  constructor(maze, blockSize = 2) {
    this.maze = maze.getGrid();
    this.blockSize = blockSize;
    this.offsetX = -(this.maze[0].length * blockSize) / 2;
    this.offsetZ = -(this.maze.length * blockSize) / 2;

    this.nodes = [];
    this.matrix = [];
    this.visited = Array.from({ length: this.maze.length }, () => Array(this.maze[0].length).fill(false));

    this.dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    this.buildGraph();
  }

  worldToGrid(pos) {
    const col = Math.floor((pos.x - this.offsetX) / this.blockSize);
    const row = Math.floor((pos.z - this.offsetZ) / this.blockSize);
    return {
      row: Math.max(0, Math.min(row, this.maze.length-1)),
      col: Math.max(0, Math.min(col, this.maze[0].length-1))
    };
  }

  isNode(x, y) {
    if (this.maze[y][x] === 1) return false;
    let open = 0;
    for (const [dx, dy] of this.dirs) {
      const nx = x + dx, ny = y + dy;
      if (this.maze[ny]?.[nx] === 0) open++;
    }
    return open !== 2 || (this.maze[y-1]?.[x] !== this.maze[y+1]?.[x] && this.maze[y]?.[x-1] !== this.maze[y]?.[x+1]);
  }

  buildGraph() {
    const explore = (x, y, parentIndex = -1) => {
      if (this.visited[y][x]) return;
      this.visited[y][x] = true;

      if (this.isNode(x, y)) {
        let nodeIndex = this.nodes.findIndex(([nx, ny]) => nx === x && ny === y);
        if (nodeIndex === -1) {
          nodeIndex = this.nodes.length;
          this.nodes.push([x, y]);
          this.matrix[nodeIndex] = Array(this.nodes.length).fill(0);
          for (let i = 0; i < this.matrix.length; i++) this.matrix[i][nodeIndex] = this.matrix[i][nodeIndex] || 0;
        }

        if (parentIndex !== -1) {
          this.matrix[parentIndex][nodeIndex] = 1;
          this.matrix[nodeIndex][parentIndex] = 1;
        }
        parentIndex = nodeIndex;
      }

      for (const [dx, dy] of this.dirs) {
        const nx = x + dx, ny = y + dy;
        if (this.maze[ny]?.[nx] === 0 && !this.visited[ny][nx]) explore(nx, ny, parentIndex);
      }
    };

    explore(1,1);
  }

  nearestNode(pos) {
    let minDist = Infinity;
    let nearest = 0;
    for (let i = 0; i < this.nodes.length; i++) {
      const [nx, ny] = this.nodes[i];
      const d = (nx - pos.col)**2 + (ny - pos.row)**2;
      if (d < minDist) {
        minDist = d;
        nearest = i;
      }
    }
    return nearest;
  }

  bfsPath(startNode, targetNode) {
    const queue = [[startNode]];
    const visited = new Set([startNode]);

    while (queue.length) {
      const path = queue.shift();
      const node = path[path.length-1];
      if (node === targetNode) return path;

      for (let i = 0; i < this.matrix[node].length; i++) {
        if (this.matrix[node][i] && !visited.has(i)) {
          visited.add(i);
          queue.push([...path, i]);
        }
      }
    }
    return null;
  }

  findPath(aiTankMesh, targetMesh) {
    const aiGrid = this.worldToGrid(aiTankMesh.position);
    const targetGrid = this.worldToGrid(targetMesh.position);

    const startNode = this.nearestNode(aiGrid);
    const targetNode = this.nearestNode(targetGrid);

    const pathIndices = this.bfsPath(startNode, targetNode);
    if (!pathIndices) return [];

    return pathIndices.map(i => this.nodes[i]);
  }
}

