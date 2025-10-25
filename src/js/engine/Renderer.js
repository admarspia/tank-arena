// engine/Renderer.js
import * as THREE from "three";
import Maze from "../maze/maze.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Renderer {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0d8ef);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    this.camera.position.set(20, 20, 20);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    
    this.controls.minDistance = 4;
    this.controls.maxDistance = 7;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle =  Math.PI/2.5;
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 30, 20);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    this.mazeGrid = new Maze(30,30);

    window.addEventListener("resize", () => this.onWindowResize());
    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  createBlock(x, y, z, color, width, height, depth) {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    return mesh;
  }

  createMaze(mazeGrid, blockSize = 4, wallHeight = 2, wallColor = 0x333333) {
      const offsetX = -(mazeGrid[0].length * blockSize) / 2;
      const offsetZ = -(mazeGrid.length * blockSize) / 2;

      for (let row = 0; row < mazeGrid.length; row++) {
        for (let col = 0; col < mazeGrid[0].length; col++) {
          if (mazeGrid[row][col] === 1) {
            const x = offsetX + col * blockSize;
            const z = offsetZ + row * blockSize;

            const block = this.createBlock(
              x,
              wallHeight / 2,
              z,
              wallColor,
              blockSize,
              wallHeight,
              blockSize
            );
            this.scene.add(block);
          }
        }
      }
  }


  createRadicalGeo(x, y, z, innerRadius, outerRadius, length, color) {
    const geo = new THREE.CylinderGeometry(innerRadius, outerRadius, length, 16);
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    return mesh;
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
}

