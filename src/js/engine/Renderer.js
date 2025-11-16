import * as THREE from "three";

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

        this.container = document.getElementById("gameArea");

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        this.container.appendChild(this.renderer.domElement);

        this.renderer.shadowMap.enabled = true;

        const ambient = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(20, 30, 20);
        dirLight.castShadow = true;
        this.scene.add(dirLight);

        const groundGeo = new THREE.PlaneGeometry(200, 200);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x777777 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        window.addEventListener("resize", () => this.onWindowResize());
    }


    onWindowResize() {
        this.camera.aspect =
            this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
    }

    createBlock(x, y, z, color, width, height, depth) {
        const geo = new THREE.BoxGeometry(width, height, depth);
        const mat = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        return mesh;
    }

    createWallBlock(x, y, z, size = 2, height = 4) {
        const geometry = new THREE.BoxGeometry(size, height, size);
        const material = new THREE.MeshStandardMaterial({
            color: 0x444444,  // Real wall color
            roughness: 0.6,
            metalness: 0.1
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;

        const edges = new THREE.EdgesGeometry(geometry);
        const outline = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x000000 })
        );
        mesh.add(outline);

        return mesh;
    }


    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

